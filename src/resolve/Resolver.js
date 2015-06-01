import React from "react";

import Container from "./Container";
import ResolverError from "./ResolverError";
import {chan, take, put, go, timeout} from "../js-csp/src/csp"; /*eslint no-unused-vars:0 */


export default class Resolver {
  constructor(states = {}) {
    this.states = states;
  }
  promises=[];
  frozen=false;
  awaitChan=chan();


  finish(renderer, values=[]) {
     const self = this;
    const innerFinish = (_values, resolve) =>
    {
      console.log("finsish ::: " + _values.length);
      const total = self.promises.length;
      renderer();
      if (this.promises.length > total) {
        go(function* (){
          const vals = yield self.awaitChan;
           console.log("got ::: " + vals.length);
          innerFinish(_values.concat(vals), resolve);
        });
      }
      else
      {
        resolve(values);
      }
    };


    return new Promise(resolve=>innerFinish( values, resolve));
  }

  finishold(renderer, values=[]) {
    //renderer();
    const self = this;
    const finishPromise = new Promise((resolve)=>{
      //resolve([]);
      go(function* (){
        const vals = yield self.awaitChan;
        console.log("values:" + vals.length);
        //vals = [];
        //resolve(vals); // self.awaitChan);
        resolve(vals);
      });
    });
    return finishPromise;
  }

  freeze() {
    this.frozen = true;
  }

  fulfillState(state, callback) {
    state.error = undefined;
    state.fulfilled = true;
    state.rejected = false;

    return callback ? callback(state) : state;
  }

  getContainerState(container) {

    const { id } = container;

    if (!id) {
      throw new ReferenceError(`${container.constructor.displayName} should have an ID`);
    }

    const state = this.states[id] || this.rehydrate(id) || {
      fulfilled: false,
      rejected: false,
      values: {}
    };

    if (!this.states[id]) {
      this.states[id] = state;
    }

    return state;
  }

  clearContainerState(container) {
    const { id } = container;

    Object.keys(this.states)
      .filter(key => key.indexOf(id) === 0)
      .forEach(key => this.states[key] = undefined)
    ;
  }

  rejectState(error, state, callback) {
    state.error = error;
    state.fulfilled = false;
    state.rejected = true;

    if (callback) {
      callback(state);
    }

    throw new Error(`${this.constructor.displayName} was rejected: ${error}`);
  }

  rehydrate(id) {
    if (typeof __resolver__ === "undefined") {
      return null;
    }
    return __resolver__[id]; /*eslint no-undef:0*/
  }

  resolve(container, callback) {
    const self = this;
    const asyncProps = container.props.resolve || {};
    const state = this.getContainerState(container);

    const asyncKeys = Object.keys(asyncProps)
      // Assign existing prop values
      .filter((asyncProp) => {
        if (container.props.hasOwnProperty(asyncProp)) {
          state.values[asyncProp] = container.props[asyncProp];

          return false;
        }

        return true;
      })
      // Filter out pre-loaded values
      .filter((asyncProp) => {
        return !state.values.hasOwnProperty(asyncProp);
      });

    if (!asyncKeys.length) {
      this.fulfillState(state, callback);
      go(function* (){
        console.log("putting none");
        yield put(self.awaitChan, []);
      });
    }

    if (this.frozen) {
      throw new ResolverError([
        "Resolver is frozen for server rendering.",
        `${container.constructor.displayName} (#${container.id}) should have already resolved`//,
        //`"${asyncKeys.join("\", \"")}". (http://git.io/vvvkr)`,
      ].join(" "));
    }

    const promises = asyncKeys.map((prop) => {
      const valueOf = container.props.resolve[prop];
      const value = container.props.hasOwnProperty(prop)
        ? container.props[prop]
        : valueOf(container.props.props, container.props.context)
      ;
      return {prop, value};
    });
     console.log("P LENGTH " + promises.length);
    const {rejectState, fulfillState} = this;
    this.promises = this.promises.concat(promises);
    go(function* (){
      try{
        console.log("P LENGTH1 " + promises.length);
        for(let promise of promises)
        {
          console.log(promise.prop);
          state.values[promise.prop] = promise.result = yield promise.value;
          console.log("got!!!¬");
        }
        console.log("P LENGTH2 " + promises.length);
        const toPut = promises.map(p=>p.result);
        console.log("putting some " + toPut.length);
        fulfillState.bind(self)(state, callback);
        yield put(self.awaitChan, promises.filter(p=>p.result).map(p=>p.result));
      }
      catch(error){
        rejectState.bind(self)(error, state, callback);
      }

    });
  }

  static createContainer(Component, props = {}) {
    if (!Component.hasOwnProperty("displayName")) {
      throw new ReferenceError("Resolver.createContainer requires wrapped component to have `displayName`");
    }

    class ComponentContainer extends React.Component {
      render() {
        return (
          <Container
            component={Component}
            context={this.context}
            props={this.props}
            {...props}/>
        );
      }
    }

    ComponentContainer.childContextTypes = props.childContextTypes;
    ComponentContainer.contextTypes = props.contextTypes;
    ComponentContainer.displayName = `${Component.displayName}Container`;

    return ComponentContainer;
  }

  static render(element, node, instance = new Resolver()) {
    React.render((
      <Container resolver={instance}>
        {element}
      </Container>
    ), node);

    return instance;
  }

  static renderToString(element) {
    const resolver = new Resolver();
    const context = <Container resolver={resolver}>{element}</Container>;

    return resolver.finish(()=>React.renderToString(context))
      .then(() => {
        resolver.freeze();
        console.log("here");
        var html = React.renderToString(context);
        console.log("there");
        return {
          data: resolver.states,
          toString() { return html; }
        };
      });
  }

  static renderToStaticMarkup(element) {
    const resolver = new Resolver();
    const context = <Container resolver={resolver}>{element}</Container>;


    return resolver.finish(()=>React.renderToStaticMarkup(context)).then(() => {
      resolver.freeze();

      var html = React.renderToStaticMarkup(context);
      return {
        data: resolver.states,
        toString() { return html; }
      };
    });
  }

}

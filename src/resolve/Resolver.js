import React from "react";

import Container from "./Container";
import ResolverError from "./ResolverError";
import {chan, take, put, go, timeout} from "../js-csp/src/csp"; /*eslint no-unused-vars:0 */


const myRenderTo = (element, renderFunc) =>
  new Promise(resolve=>
    {
      const resolver = new Resolver(); /*eslint no-use-before-define:0*/
      const context = <Container resolver={resolver}>{element}</Container>;
      go(function* (){
        let html = yield resolver.finish(()=>renderFunc(context));
        resolver.freeze();
        //var html = React.renderToStaticMarkup(context);
        resolve({
            data: resolver.states,
            toString() { return html; }
          });
      });
    }
  );

export default class Resolver {
  constructor(states = {}) {
    this.states = states;
  }
  channels=[];
  frozen=false;
  awaitChan=chan();

  finish(renderer, values=[]) {
    const self = this;
    const finishChannel = chan();

    go(function* (){
      var complete = false;
      var total = self.channels.length;
      while(!complete)
      {
        renderer();
        if(self.channels.length > total)
        {
          total = self.channels.length;
          values = values.concat(yield self.awaitChan);
        }
        else
        {
          yield put(finishChannel, renderer());
          complete = true;
        }
      }
    });

    return finishChannel;
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
    console.log("r");
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
        yield put(self.awaitChan, []);
      });
    }

    if (this.frozen) {
      throw new ResolverError([
        "Resolver is frozen for server rendering.",
        `${container.constructor.displayName} (#${container.id}) should have already resolved`//,
        //i've only commented this out because it scuppers my sublime text colouring
        //`"${asyncKeys.join("\", \"")}". (http://git.io/vvvkr)`,
      ].join(" "));
    }

    const channels = asyncKeys.map((prop) => {
      const valueOf = container.props.resolve[prop];
      const value = container.props.hasOwnProperty(prop)
        ? container.props[prop]
        : valueOf(container.props.props, container.props.context)
      ;
      return {prop, value};
    });
    const {rejectState, fulfillState} = this;
    this.channels = this.channels.concat(channels);
    go(function* (){
      try{
        for(let channel of channels)
        {
          state.values[channel.prop] = channel.result = yield channel.value;
        }
        const toPut = channels.map(p=>p.result);
        fulfillState.bind(self)(state, callback);
        yield put(self.awaitChan, channels.filter(p=>p.result).map(p=>p.result));
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
    return myRenderTo(element, React.renderToString);
  }

  static renderToStaticMarkup(element) {
    return myRenderTo(element, React.renderToStaticMarkup);
  }

}



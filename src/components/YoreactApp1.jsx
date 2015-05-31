"use strict";

import React, { Component} from "react/addons";
import pureRender from "pure-render-decorator";
import fluxComponent from "../flummox/decorators/fluxComponent";
import fluxContext from "../flummox/decorators/fluxContext";
import displayName from "../flummox/decorators/displayName";
import {Link} from "react-router";
import {Resolver} from "react-resolver";
import {List} from "immutable";



//require("normalize.css");
//require("../styles/main.css");


@fluxContext
@pureRender
@displayName("InnerComponent")
class InnerComponent extends React.Component {
  constructor(){
    super(...arguments);
    this.onClick = this.onClick.bind(this);
  }
  onClick(){
    const flux = this.context.flux;
    flux.getActions("messages").newMessage("Hello, world!");
  }
  render(){

    //total frig!!
    const list = this.props.list.toArray ? this.props.list.toArray() : this.props.list;
    return <div>
        <Link to={this.props.link}>{this.props.linkName}</Link>
        <button onClick={this.onClick}>click me</button>
        <ul>
          {list.map(l=><li key={l.id}>{l.content}:-angie!ugsgsgsgsuuuu!-:{l.id}</li>)}
        </ul>
      </div>;
  };
}

@fluxComponent({
  connectToStores: {
    messages: store => ({
      list: store.getMessages()
    })
  }
})
export default class YoreactApp extends Component {
  render() {
    const {list} = this.props;
    return (
          list ? <InnerComponent linkName="APP2" link="app2" list={list}/> : <script/>
    );
  }
}

export var YoAlt = Resolver.createContainer(InnerComponent, {
  resolve: {
    linkName: ()=>"APP",
    link: ()=>"app1",
    list: ()=>
     new Promise(
        resolve=>
          setTimeout(
            (()=>{
                console.log("promise resolving...");
                resolve(new List([{id: 0, content: "ahhhh"}]));
              }
              ),
            1000)
        )
  }
});


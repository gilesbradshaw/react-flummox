"use strict";

import React, { Component} from "react/addons";
import pureRender from "pure-render-decorator";
import fluxComponent from "../flummox/decorators/fluxComponent";
import fluxContext from "../flummox/decorators/fluxContext";


//require("normalize.css");
//require("../styles/main.css");


@fluxContext
@pureRender
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
    //alert(JSON.stringify(this.props));
    return <div>
        <button onClick={this.onClick}>click me</button>
        <ul>
          {this.props.list.toArray().map(l=><li key={l.id}>{l.content}:-angie!!-:{l.id}</li>)}
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
          list ? <InnerComponent list={list}/> : <script/>
    );
  }
}

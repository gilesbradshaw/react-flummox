"use strict";

import React, { Component} from "react/addons";
import pureRender from "pure-render-decorator";
import fluxComponent from "../flummox/decorators/fluxComponent";
import fluxContext from "../flummox/decorators/fluxContext";
import {Link} from "react-router";


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
    flux.getActions("asyncs").newMessage("Hello, world!");
  }
  render(){
    //alert(JSON.stringify(this.props));
    return <div>
        <button onClick={this.onClick}>click me</button>
         <Link to="app1">app1</Link>
        <ul>
          {this.props.list.toArray().map(l=><li key={l.id}>{l.content}:-angie app!!-:{l.id}</li>)}
        </ul>
        <ul>
          {this.props.beginingList.toArray().map(l=><li key={l.id}>{l.content}:-angie app!!-:{l.id}</li>)}
        </ul>
      </div>;
  };
}

@fluxComponent({
  connectToStores: {
    asyncs: store => ({
      list: store.getMessages(),
      beginingList: store.getBeginingMessages()
    })
  }
})
export default class YoreactApp extends Component {
  render() {
    const {list, beginingList} = this.props;
    return (
          list ? <InnerComponent list={list} beginingList={beginingList}/> : <script/>
    );
  }
}

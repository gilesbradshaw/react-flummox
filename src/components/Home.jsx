"use strict";

import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import {RouteHandler} from "react-router";
import pureRender from "pure-render-decorator";
import dataDependencies from "../utils/decorators/dataDependencies";
import displayName from "../utils/decorators/displayName";
import {chan, take, put, go, timeout} from "../js-csp/src/csp";
import {List} from "immutable";





@dataDependencies({
  list: ()=>{
    const ch = chan();
    go(function* (){
      yield timeout(1000);
      yield put(ch, new List(
        [
            {
                id: 0,
                content: "no news is good news"
            },
            {
                id: 1,
                content: "there is strange news from another star"
            },
            {
                id: 2,
                content: "send three and four pence we are going to advance"
            }
        ]
      ));
    });
    return ch;
  }
})
@displayName("Home")
export default class Home extends Component {
  render(){
      return (
        <div>
          <div>Home</div>
          <ul>
            {new List(this.props.list)
              .map(l=>
                <li key={l.id}>
                  {l.content}
                 </li>
              )
            }
          </ul>
          <RouteHandler {...this.props} />
        </div>
      );
  };
}

"use strict";

import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import {RouteHandler} from "react-router";
import pureRender from "pure-render-decorator";
import dataDependencies, {errorRender, waitRender} from "../utils/decorators/dataDependencies";
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
      yield timeout(1000);
      yield put(ch, new List(
        [
            {
                id: 0,
                content: "good news is no news"
            },
            {
                id: 1,
                content: "there is strange news from another star"
            },
            {
                id: 2,
                content: "send reinforcements we are going to a dance"
            }
        ]
      ));
    });
    return ch;
  }
})
@errorRender((state) => <h1 style={{color: "red"}}>error:{state.error.message}</h1>)
@waitRender((state) => <h1 style={{color: "green"}}>WAITING!!!!!!!!!!!!!!!!</h1>)
@displayName("News")
export default class News extends Component {
  render(){
    if(this.state && this.state.error)
    {
        return <div>{this.state.error}</div>;
    }
    return (
      <div>
        <div>News</div>
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
//News.errorRender = (state)=><div>an error</div>;

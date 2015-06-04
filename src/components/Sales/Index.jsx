"use strict";

import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import pureRender from "pure-render-decorator";
import {Enquiry, routes as enquiryRoutes} from "./enquiry/index";
import {Report, routes as reportRoutes} from "./report/index";
import {Route, DefaultRoute, RouteHandler, Link} from "react-router";
import {Menu as EnquiryMenu} from "./enquiry/index";
import {Menu as ReportMenu} from "./report/index";
import dataDependencies from "../../utils/decorators/dataDependencies";
import displayName from "../../utils/decorators/displayName";
import {chan, take, put, go, timeout} from "../../js-csp/src/csp";
import {List} from "immutable";

@dataDependencies({
  list: ()=>{
    const ch = chan();
    go(function* (){
      console.log("getting sales page");
      yield timeout(100);
      yield put(ch, new List([{id: 0, content: "ahhhh sales page"}]));
    });
    return ch;
  }
})
@displayName("SalesPage")
class SalesPage extends Component {
  render(){
    return (
      <div>
        <div>Sales page</div>
        <ul>
          {new List(this.props.list).map(l=><li key={l.id}>{l.content}{l.id}<SalesSubPage/></li>)}
        </ul>
      </div>
    );
  };
}

@dataDependencies({
  list: ()=>{
    const ch = chan();
    go(function* (){
      yield timeout(100);
      yield put(ch, new List([{id: 0, content: "ahhhh sales sub page"}]));
    });
    return ch;
  }
})
@displayName("SalesSubPage")
class SalesSubPage extends Component {
  render(){
    return (
      <div>
        <div>Sales Sub page</div>
        <ul>
          {new List(this.props.list).map(l=><li key={l.id}>{l.content}{l.id}</li>)}
        </ul>
      </div>
    );
  };
}


export class Menu extends Component {
  render(){
   return (
       <ul>
            <li>
                <Link to="sales-enquiry">Enquiry</Link>
                <EnquiryMenu/>
            </li>
            <li>
                <SalesPage/>
            </li>
            <li>
                <Link to="sales-report">Report</Link>
                <ReportMenu/>
            </li>
        </ul>
    );
  }
}


export default class Sales extends Component {
  render(){
    //alert(JSON.stringify(this.props));
    return (
        <div>
            <div>Sales</div>
            <RouteHandler {...this.props} />
        </div>
    );
  };
}
export default class SalesDefault extends Component {
  render(){
    //alert(JSON.stringify(this.props));
    return (
        <div>
            <Menu/>
        </div>
    );
  };
}

export var routes = ()=>
    <Route path="sales" name="sales" handler={Sales}>
        <DefaultRoute handler={SalesDefault}/>
        {enquiryRoutes()}
        {reportRoutes()}
     </Route>;

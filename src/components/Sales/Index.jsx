"use strict";

import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import pureRender from "pure-render-decorator";
import {Enquiry, routes as enquiryRoutes} from "./enquiry/index";
import {Report, routes as reportRoutes} from "./report/index";
import {Route, RouteHandler, Link} from "react-router";

//require("normalize.css");
//require("../styles/main.css");
export class Menu extends Component {
  render(){
   return (
       <ul>
            <li><Link to="sales-enquiry">Enquiry</Link></li>
            <li><Link to="sales-report">Report</Link></li>
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
            <Menu/>
            <RouteHandler {...this.props} />
        </div>
    );
  };
}

export var routes = ()=>
    <Route path="sales" name="sales" handler={Sales}>
        {enquiryRoutes()}
        {reportRoutes()}
     </Route>;

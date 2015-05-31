"use strict";

import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import pureRender from "pure-render-decorator";
import {Enquiry, routes as enquiryRoutes} from "./enquiry/index";
import {Report, routes as reportRoutes} from "./report/index";
import {Route, DefaultRoute, RouteHandler, Link} from "react-router";
import {Menu as EnquiryMenu} from "./enquiry/index";
import {Menu as ReportMenu} from "./report/index";


//require("normalize.css");
//require("../styles/main.css");

export class Menu extends Component {
  render(){
   return (
       <ul>
            <li>
                <Link to="sales-enquiry">Enquiry</Link>
                <EnquiryMenu/>
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

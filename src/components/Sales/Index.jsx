"use strict";

import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import pureRender from "pure-render-decorator";
import {RouteHandler, Link} from "react-router";
import enquiry from "./enquiry/index";

//require("normalize.css");
//require("../styles/main.css");


@pureRender
export default class Sales extends Component {
  render(){
    //alert(JSON.stringify(this.props));
    return (
        <div>
            <div>Sales</div>
            <ul>
                <li><Link to="sales-enquiry-add">Add enquiry</Link></li>
                <li><Link to="sales-enquiry-update">Update enquiry</Link></li>
                <li><Link to="sales-enquiry-central-lead">Central lead</Link></li>
            </ul>
            <RouteHandler {...this.props} />
        </div>
    );
  };
}

export {enquiry};


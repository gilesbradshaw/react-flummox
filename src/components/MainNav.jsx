"use strict";

import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import pureRender from "pure-render-decorator";
import {RouteHandler, Link} from "react-router";



//require("normalize.css");
//require("../styles/main.css");


@pureRender
export default class MainNav extends Component {
  render(){
    //alert(JSON.stringify(this.props));
    return (
        <div>
            <div>Main Nav</div>
            <ul>
                <li><Link to="management">Management</Link></li>
            </ul>
            <RouteHandler {...this.props} />
        </div>
    );
  };
}


/*

<ul>
                <li><Link to="app">Home</Link></li>
                <li><Link to="sales">Sales</Link></li>
                <li><Link to="management">Management</Link></li>
                <li><Link to="messages">Messages</Link></li>
                <li><Link to="news">News</Link></li>
                <li><Link to="support">Support</Link></li>
                <li><Link to="language">Language</Link></li>
            </ul>

            */

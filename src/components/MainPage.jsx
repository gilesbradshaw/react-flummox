"use strict";

import React, { Component} from "react/addons"; /* eslint no-unused-vars:0*/
import pureRender from "pure-render-decorator";
import {RouteHandler, Link} from "react-router";



//require("normalize.css");
//require("../styles/main.css");


@pureRender
export default class MainPage extends Component {
  render(){
    //alert(JSON.stringify(this.props));
    return (
        <div>
            <div>MainPage</div>
            <RouteHandler {...this.props} />
        </div>
    );
  };
}

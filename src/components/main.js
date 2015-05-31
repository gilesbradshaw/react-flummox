"use strict";
import React from "react"; /*eslint no-unused-vars:0 */
import {flux} from "../flummox/flummox";
import FluxComponent from "flummox/component";
import Router from "react-router";
import routes from "../routes/routes";
import { Resolver } from "../resolve/index";

const content = document.getElementById("content");

Router.run(routes, Router.HistoryLocation, function (Handler) {
 /*Resolver.renderToString(
    <FluxComponent flux={flux}>
        <Handler/>
        </FluxComponent>
    ).then(h=>console.log(h));*/
//console.log(JSON.stringify(__resolver__));
  //const resolver = new Resolver();
  //this is odd!
  //Handler(); /*eslint new-cap:0*/
  //const resolver = new Resolver();
  const resolver = new Resolver(__resolver__); /*eslint no-undef:0*/
  Resolver.render(
    <FluxComponent flux={flux}>
        <Handler/>
        </FluxComponent>
    , content, resolver);
});



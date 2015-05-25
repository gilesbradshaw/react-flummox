"use strict";
import React from "react";
import YoreactApp from "./YoreactApp";
import {flux} from "../flummox/flummox";
import FluxComponent from "flummox/component";
import Router, {Route} from "react-router";

const content = document.getElementById("content");

const Routes = (
  <Route handler={YoreactApp}>
    <Route name="/" handler={YoreactApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(
    <FluxComponent flux={flux}>
        <Handler/>
        </FluxComponent>
    , content);
});



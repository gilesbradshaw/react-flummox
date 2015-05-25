"use strict";
import React from "react";
import {flux} from "../flummox/flummox";
import FluxComponent from "flummox/component";
import Router from "react-router";
import routes from "../routes/routes";

const content = document.getElementById("content");

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(
    <FluxComponent flux={flux}>
        <Handler/>
        </FluxComponent>
    , content);
});



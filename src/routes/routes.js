"use strict";
import React from "react"; /*eslint no-unused-vars:0 */
import YoreactApp from "../components/YoreactApp";
import YoreactApp1 from "../components/YoreactApp1";
import PageNotFound from "../components/PageNotFound";
import {Route, NotFoundRoute} from "react-router";

const routes =
  <Route path="/">
    <Route path="app" name="app" handler={YoreactApp}>
    </Route>
    <Route path="app1" name="app1" handler={YoreactApp1}>
    </Route>
    <NotFoundRoute handler={PageNotFound}/>
  </Route>;
export default routes;

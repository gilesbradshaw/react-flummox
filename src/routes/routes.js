"use strict";
import React from "react"; /*eslint no-unused-vars:0 */
import MainPage from "../components/MainPage";
import MainNav from "../components/MainNav";
import Sales, {routes as salesRoutes} from "../components/Sales/Index";
import Enquiry, {
    routes as enquiryRoutes
} from "../components/Sales/enquiry";
import Management from "../components/Management";
import Messages from "../components/Messages";
import News from "../components/News";
import Support from "../components/Support";
import Language from "../components/Language";
import PageNotFound from "../components/PageNotFound";
import {DefaultRoute, Route, NotFoundRoute} from "react-router";


const routes =
  <Route path="/" name="app" handler={MainNav}>
    {salesRoutes()}
    <Route path="management" name="management" handler={Management}>
    </Route>
    <Route path="messages" name="messages" handler={Messages}>
    </Route>
    <Route path="news" name="news" handler={News}>
    </Route>
    <Route path="support" name="support" handler={Support}>
    </Route>
    <Route path="language" name="language" handler={Language}>
    </Route>
  </Route>;
export default routes;

"use strict";
import React from "react"; /*eslint no-unused-vars:0 */
import MainPage from "../components/MainPage";
import MainNav from "../components/MainNav";
import Sales, {enquiry} from "../components/Sales/Index";
import Management from "../components/Management";
import Messages from "../components/Messages";
import News from "../components/News";
import Support from "../components/Support";
import Language from "../components/Language";
import PageNotFound from "../components/PageNotFound";
import {DefaultRoute, Route, NotFoundRoute} from "react-router";

const {
    AddEnquiry,
    UpdateEnquiry,
    CentralLead
} = enquiry;

const routes =
  <Route path="app" name="app" handler={MainNav}>
    <Route path="management" name="management" handler={Management}>
    </Route>
  </Route>;
export default routes;


/*
 <Route path="sales" name="sales" handler={Sales}>
        <Route path="sales-enquiry-add" name="sales-enquiry-add" handler={AddEnquiry}>
        </Route>
        <Route path="sales-enquiry-update" name="sales-enquiry-update" handler={UpdateEnquiry}>
        </Route>
        <Route path="sales-enquiry-central-lead" name="sales-enquiry-central-lead" handler={CentralLead}>
        </Route>
    </Route>
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
    */

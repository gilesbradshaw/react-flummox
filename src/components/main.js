'use strict';


import YoreactApp from './YoreactApp';
import React from 'react';
import {tryAction} from '../actions/actions';
import {tryStore} from '../stores/store';

var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={YoreactApp}>
    <Route name="/" handler={YoreactApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});

const dec = function(target){ return target;}
@dec
class decme {}

const x=new decme();


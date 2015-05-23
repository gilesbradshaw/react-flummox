'use strict';


var YoreactApp = require('./YoreactApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');
React.render(<YoreactApp/>,content);
/*
const dec = function(target){ return target;}
@dec
class decme {}

const x=new decme();

*/
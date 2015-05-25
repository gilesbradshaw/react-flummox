import FluxComponent from 'flummox/component';
import YoreactApp from '../src/components/YoreactApp';
import React from 'react';
import {flux} from '../src/flummox/flummox';
import nunjucks from 'nunjucks';
import HtmlDocument from './HtmlDocument';

nunjucks.configure('views', {
  autoescape: true,
});
let webpackStats;
if (process.env.NODE_ENV === "production") {
  webpackStats = require("./webpack-stats.json");
}

const express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 4567,
    publicDir = process.argv[2] || __dirname + '/public';


app.use( function (req, res, next){
    console.log("ahhh middle ware!!!");
    if (process.env.NODE_ENV === "development") {
        webpackStats = require("./webpack-stats.json");

        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        delete require.cache[require.resolve("./webpack-stats.json")];
    }
    const h2 = React.renderToStaticMarkup(
      <HtmlDocument 
        script={webpackStats.script}
        css={webpackStats.css}>
        <FluxComponent flux={flux}>
            <YoreactApp/>
        </FluxComponent>
      </HtmlDocument>
    );


    res.send(h2);
    next();
    }
);

if (app.get("env") === "development") {
  require("../webpack/server");
}

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(publicDir));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);




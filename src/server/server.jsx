import FluxComponent from "flummox/component";
import React from "react";
import Router from "react-router";
import routes from "../routes/routes";
import {flux} from "../flummox/flummox";
import HtmlDocument from "./HtmlDocument";
import { Resolver } from "../resolve/index";// "react-resolver"; //"../resolve/index"; //"react-resolver"; //

let webpackStats;
if (process.env.NODE_ENV === "production") {
  webpackStats = require("./webpack-stats.json");
}

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    errorHandler = require("errorhandler"),
    methodOverride = require("method-override"),
    hostname = process.env.HOSTNAME || "localhost",
    port = parseInt(process.env.PORT, 10) || 4567,
    publicDir = process.argv[2] || __dirname + "/public";

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

app.use( function (req, res){
    if (process.env.NODE_ENV === "development") {
        webpackStats = require("./webpack-stats.json");

        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        delete require.cache[require.resolve("./webpack-stats.json")];
    }
    console.log(req.url);
    const router = Router.create({
        routes: routes,
        location: req.url
    });
    router.run(
      (_Handler)=>{
        /*res.send(
          React.renderToStaticMarkup(
            <HtmlDocument
              resolverScript={{}}
              script={webpackStats.script}
              css={webpackStats.css} innerHTML=''>
            </HtmlDocument>
          )
        );
        return;*/
        Resolver.renderToString( /*eslint no-unreachable:0*/
          <FluxComponent flux={flux}>
                <_Handler/>
            </FluxComponent>)
        .then(innerHTML=>{
          console.log("to static markup");
          res.send(
            React.renderToStaticMarkup(
              <HtmlDocument
                resolverScript={innerHTML.data}
                script={webpackStats.script}
                css={webpackStats.css} innerHTML={innerHTML.toString()}>
              </HtmlDocument>
            )
          );
        });
      }
    );
});

if (app.get("env") === "development") {
  require("../webpack/server");
}



console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);




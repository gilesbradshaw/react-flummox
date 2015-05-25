import FluxComponent from "flummox/component";
import React from "react";
import Router from "react-router";
import routes from "../src/routes/routes";
import {flux} from "../src/flummox/flummox";
import HtmlDocument from "./HtmlDocument";

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
    router.run((_Handler)=>{
      const h2 = React.renderToStaticMarkup(
        <HtmlDocument
          script={webpackStats.script}
          css={webpackStats.css}>
          <FluxComponent flux={flux}>
              <_Handler/>
          </FluxComponent>
        </HtmlDocument>
      );
      res.send(h2);
    });

});

if (app.get("env") === "development") {
  require("../webpack/server");
}



console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);




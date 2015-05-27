"use strict";

import React, { PropTypes } from "react";

//import { trackingId } from "../config";
//import ga from "./ga";
//import { provideContext } from "fluxible/addons";


class HtmlDocument extends React.Component {

  static propTypes = {
    //context: PropTypes.object.isRequired,
    //lang: PropTypes.string.isRequired,
    //state: PropTypes.string.isRequired,
    //markup: PropTypes.string.isRequired,
    script: PropTypes.arrayOf(PropTypes.string),
    css: PropTypes.arrayOf(PropTypes.string),
    innerHTML: PropTypes.string.isRequired,
  }

  static defaultProps = {
    script: [],
    css: [],
    innerHTML:''
  }

  static contextTypes = {
    //getStore: PropTypes.func.isRequired
  }

  render() {
    const { script,resolverScript, css, lang, innerHTML } = this.props;
    //const htmlHead = this.context.getStore("HtmlHeadStore");
    return (
      <html lang = {lang || "en-GB"}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <title>Giles app</title>
          { css.map((href, k) =>
            <link key={k} rel="stylesheet" type="text/css" href={href} />)
          }
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: innerHTML}}>
          </div>
          <script async dangerouslySetInnerHTML={{__html:"var __resolver__ = " + JSON.stringify(resolverScript) + ";"}}/>
          { script.map((src, k) => <script key={k} src={src} />) }
        </body>
      </html>
    );
  }
}

//HtmlDocument = provideContext(HtmlDocument);

export default HtmlDocument;

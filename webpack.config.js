/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
"use strict";
var webpack = require("webpack");

module.exports = {

  output: {
    filename: "main.js",
    publicPath: "/assets/"
  },

  cache: true,
  debug: true,
  devtool: false,
  entry: [
      "webpack/hot/only-dev-server",
      "./src/components/main.js"
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ["", ".js", ".jsx", "css", ".json"],
    alias: {
      "styles": __dirname + "/src/styles",
      "mixins": __dirname + "/src/mixins",
      "components": __dirname + "/src/components/",
      "stores": __dirname + "/src/stores/",
      "actions": __dirname + "/src/actions/"
    }
  },
  module: {
   // preLoaders: [{
     // test: /\.js$/,
     // exclude: /node_modules/,
     // loader: "jsxhint"
    //}],
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: "react-hot!babel-loader?optional[]=runtime&stage=0"
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "react-hot!babel-loader?optional[]=runtime&stage=0"
    }, {
      test: /\.js$/,
      include: /node_modules\/js-csp/,
      loader: "react-hot!babel-loader?optional[]=runtime&stage=0"
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.(png|jpg)$/,
      loader: "url-loader?limit=8192"
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin(),
    // Manually do source maps to use alternate host.
    new webpack.SourceMapDevToolPlugin(
      "main.js.map",
      "\n//# sourceMappingURL=http://127.0.0.1:8000/assets/[url]")
  ]

};

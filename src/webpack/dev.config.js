// This is the webpack config to use during development.
// It enables the hot module replacement, the source maps and inline CSS styles.

import path from "path";
import webpack from "webpack";
import writeStats from "./utils/write-stats";
import notifyStats from "./utils/notify-stats";

const assetsPath = path.resolve(__dirname, "../public/assets");

const WEBPACK_HOST = "localhost";
const WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 8001;

export default {
  devtool: "cheap-module-eval-source-map",
  entry: {
    "main": [
      `webpack-dev-server/client?http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
      "webpack/hot/only-dev-server",
      "./src/components/main.js"
    ]
  },
  stats: {
    colors: true,
    reasons: false
  },
  output: {
    path: assetsPath,
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: `http://${WEBPACK_HOST}:${WEBPACK_PORT}/assets/`
  },
  resolve: {
    extensions: ["", ".js", ".jsx", "css", ".json"],
    alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/',
      'stores': __dirname + '/src/stores/',
      'actions': __dirname + '/src/actions/'
    }
  },
  
  module: {
    /*preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jsxhint'
    }],*/
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: "file" },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader?cacheDirectory&optional[]=runtime&stage=0',
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader?cacheDirectory&optional[]=runtime&stage=0',
      },
      { test: /\.scss$/, loader: "style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true" }
    ]
  },
  progress: true,
  plugins: [

    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    // print a webpack progress
    new webpack.ProgressPlugin((percentage, message) => {
      const MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
      const CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();
      process.stdout.write(`${CLEAR_LINE}${Math.round(percentage * 100)}%: ${message}${MOVE_LEFT}`);
    }),

    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify("development")
      }
    }),
    // stats
    function() { this.plugin("done", notifyStats); },
    function() { this.plugin("done", writeStats); }

  ]
};

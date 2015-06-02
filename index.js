delete process.env.BROWSER;

// Register babel to have ES6 support on the server
require("babel/register")({
  ignore: false,
  only: [
    /node_modules\/js-csp\/.*$/,
    /src\/.*$/
    ]
});

require("./src/server/server");

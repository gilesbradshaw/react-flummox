delete process.env.BROWSER;

// Register babel to have ES6 support on the server
require("babel/register")({
  //ignore: false
});

require("./server/server");

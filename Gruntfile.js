"use strict";

var mountFolder = function (connect, dir) {
  return connect.static(require("path").resolve(dir));
};

var webpackDistConfig = require("./webpack.dist.config.js"),
    webpackDevConfig = require("./webpack.config.js");

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require("load-grunt-tasks")(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON("package.json");
  grunt.loadNpmTasks("grunt-node-inspector");


  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      options: webpackDistConfig,
      dist: {
        cache: false
      }
    },

    "webpack-dev-server": {
      options: {
        hot: true,
        port: 8000,
        webpack: webpackDevConfig,
        publicPath: "/assets/",
        contentBase: "./<%= pkg.src %>/"
      },

      start: {
        keepAlive: true
      }
    },

    connect: {
      options: {
        port: 8000
      },

      dist: {
        options: {
          keepalive: true,
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },

    open: {
      options: {
        delay: 500
      },
      dev: {
        path: "http://localhost:<%= connect.options.port %>/webpack-dev-server/"
      },
      dist: {
        path: "http://localhost:<%= connect.options.port %>/"
      }
    },

    karma: {
      unit: {
        configFile: "karma.conf.js"
      }
    },

    copy: {
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: ["<%= pkg.src %>/*"],
            dest: "<%= pkg.dist %>/",
            filter: "isFile"
          },
          {
            flatten: true,
            expand: true,
            src: ["<%= pkg.src %>/images/*"],
            dest: "<%= pkg.dist %>/images/"
          }
        ]
      }
    },
    eslint: {
      standard: {
          options: {
            "quiet": true
              //configFile: "bower_components/eslintconfigs/standard.json"
          },
          src: [
              "Gruntfile.js",
              "server/**/*.js",
              "server/**/*.jsx",
              "src/**/*.js",
              "src/**/*.jsx"
          ]
      }
    },
    nodemon: {
      dev: {
        script: "index.js",
        options: {
          ext: "js,jsx,html",
          watch: [".", "views", "server"],
          nodeArgs: ["--debug"]
        }
      }
    },
    "node-inspector": {
      dev: {}
    },
    "concurrent": {
      dev: {
        tasks: ["nodemon", "node-inspector"],
        options: {
          logConcurrentOutput: true
        }
      }

    },
    env: {
      options: {
        //Shared Options Hash
      },
      dev: {
        NODE_ENV: "development",
        PORT: 7000
      }
    },


    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            "<%= pkg.dist %>"
          ]
        }]
      }
    }
  });

  grunt.registerTask("serve", function (target) {
    if (target === "dist") {
      return grunt.task.run(["build", "open:dist", "connect:dist"]);
    }

    grunt.task.run([
      "open:dev",
      "webpack-dev-server"
    ]);
  });



  grunt.registerTask("test", ["karma"]);

  grunt.registerTask("build", ["clean", "copy", "webpack"]);

  grunt.registerTask("default", ["eslint:standard", "env:dev", "concurrent:dev"]);
};

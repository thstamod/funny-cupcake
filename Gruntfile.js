module.exports = function(grunt) {
  const sass = require("node-sass");
  const autoprefixer = require("autoprefixer");
  const stylelint = require("stylelint");
  let babel = require("rollup-plugin-babel");

  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
        outputStyle: "expanded",
        sourceMapContents: true,
        precision: 6
      },
      dist: {
        files: {
          "dist/css/main.css": "src/scss/main.scss"
        }
      }
    },
    watch: {
      css: {
        files: ["src/scss/**/*.scss"],
        tasks: ["stylelint", "sass", "autoprefixer"],
        options: {
          // livereload: true
        }
      },
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["rollup"],
        options: {}
      }
    },
    autoprefixer: {
      options: {
        cascade: false
      },
      dist: {
        files: {
          "dist/css/main.css": "dist/css/main.css"
        }
      }
    },
    stylelint: {
      options: {
        syntax: "scss",
        configFile: ".stylelintrc"
        // formatter: 'string',
      },
      files: ["src/scss/**/*.scss"]
    },
    cssmin: {
      options: {
        level: 1,
        sourceMap: true,
        sourceMapInlineSources: true,
        format: {
          breaksWith: "lf"
        }
      },
      main: {
        files: [
          {
            expand: true,
            cwd: "dist/css",
            src: ["*.css", "!*.min.css"],
            dest: "dist/css",
            ext: ".min.css"
          }
        ]
      }
      // libraries: {
      //   files: [
      //     {
      //       expand: true,
      //       cwd: "dist/css",
      //       src: ["libraries/**/*.css", "!libraries/**/*.min.css"],
      //       dest: "dist/css",
      //       ext: ".min.css"
      //     }
      //   ]
      // }
    },
    rollup: {
      options: {
        format: "cjs",
        plugins: function() {
          return [
            babel({
              exclude: "./node_modules/**"
            })
          ];
        }
      },
      main: {
        dest: "dist/js/main.bundle.js",
        src: "src/js/main.js"
      }
    },
    eslint: {
      options: {
        configFile: ".eslintrc.json"
      },
      target: ["src/js/**/*.js"]
    },
    uglify: {
      options: {
        banner:
          "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        beautify: false,
        drop_console: true,
        mangle: false
      },
      main: {
        files: [
          {
            expand: true,
            src: ["dist/js/*.js", "!dist/js/*.min.js"],
            dest: ".",
            cwd: "."
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-stylelint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-rollup");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  //TASKS
  //--dev
  grunt.registerTask("watch_source", ["watch"]);
  //--prod
  grunt.registerTask("js_main_prepare_prod_no_lint", ["rollup", "uglify:main"]);
  grunt.registerTask("js_main_prepare_prod", [
    "eslint",
    "rollup",
    "uglify:main"
  ]);
  grunt.registerTask("css_prepare_prod", ["cssmin:main"]);
};

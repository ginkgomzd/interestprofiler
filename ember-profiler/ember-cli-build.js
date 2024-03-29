/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Any other options
    outputPaths: {
      app: {
        css: {
          'app': '/assets/ember-profiler.css'
        }
      }
    }
  });

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

  //Include Bootstrap
  app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
  //Include the color animation library
  app.import('bower_components/jquery-color/jquery.color.js');
  //Include the Moment date formatting library
  app.import('bower_components/moment/min/moment.min.js');
  //Include the screenshot library
  app.import('vendor/html2canvas.js');

  return app.toTree();
};

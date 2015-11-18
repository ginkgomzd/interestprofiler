#!/usr/bin/env node

//this hook installs all your plugins

//Include the Ember config file so we have all our keys in one place.
var config = require('../../ember-profiler/config/environment');
config = config();

// add your plugins to this list--either the identifier, the filesystem location or the URL
var pluginlist = [
// appear to be built in reverse

    "https://github.com/ginkgostreet/phonegap-parse-plugin.git#healthyi-1.1 --variable APP_ID="+config.parse.appId+" --variable CLIENT_KEY="+config.parse.clientKey,

    "cordova-plugin-whitelist",
    "cordova-plugin-geolocation",
    "cordova-plugin-splashscreen",
    "https://github.com/Paldom/SpinnerDialog.git",
    "https://github.com/Telerik-Verified-Plugins/SocialSharing",
    "cordova-plugin-inappbrowser",
    "phonegap-facebook-plugin --variable APP_ID="+config.parse.FacebookAppId+" --variable APP_NAME=" + config.parse.FacebookAppName
    //"cordova-plugin-facebook4 --variable APP_ID="+config.parse.FacebookAppId+" --variable APP_NAME=" + config.parse.FacebookAppName
];

// no need to configure below

var path = require('path');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    console.log(stdout);
}

pluginlist.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts);
});

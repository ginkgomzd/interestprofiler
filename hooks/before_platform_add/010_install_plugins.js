#!/usr/bin/env node

//this hook installs all your plugins

// CaliCommDev App Keys:
var PARSE_APP_ID = 'hKy3FnB8M27jIHBXZNfX1Lk2QmwoyGOeDon9EPZ3';
var PARSE_CLIENT_KEY = 'YwRrf7cxtwGoEHSJR5SPLXTuyBHEh1hdaRJUFxIo';


// add your plugins to this list--either the identifier, the filesystem location or the URL
var pluginlist = [
// appear to be built in reverse

//    "https://github.com/ginkgostreet/phonegap-parse-plugin.git#healthyi-1.1 --variable APP_ID="+PARSE_APP_ID+" --variable CLIENT_KEY="+PARSE_CLIENT_KEY,

    "cordova-plugin-whitelist"
];

// no need to configure below

var fs = require('fs');
var path = require('path');
var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    sys.puts(stdout);
}

pluginlist.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts);
});

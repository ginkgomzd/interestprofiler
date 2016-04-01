#!/usr/bin/env node

// this plugin replaces arbitrary text in arbitrary files

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];
var platform = process.env.CORDOVA_PLATFORMS;

function replace_in_file(filename, to_replace, replace_with) {
  if (fs.existsSync(filename)) {
    var data = fs.readFileSync(filename, 'utf8');

    var result = data.replace(to_replace, replace_with);
    fs.writeFileSync(filename, result, 'utf8');
  } else {
    console.log('Error Enabling Android MenuKey: could not find ' + filename);
  }
}

//this is necessary for android only
if (rootdir && platform === 'android') {
  console.log('Fix Android Menu Button');

  var androidCore = path.join(rootdir, 'platforms/android/CordovaLib/src/org/apache/cordova/CoreAndroid.java');
  var webView = path.join(rootdir, 'platforms/android/CordovaLib/src/org/apache/cordova/CordovaWebViewImpl.java');

  replace_in_file(androidCore,
    "webView.setButtonPlumbedToJs(KeyEvent.KEYCODE_VOLUME_DOWN, override);",
    "webView.setButtonPlumbedToJs(KeyEvent.KEYCODE_VOLUME_DOWN, override);\n" +
    "}\n else if (button.equals(\"menubutton\")) {\n" +
    "webView.setButtonPlumbedToJs(KeyEvent.KEYCODE_MENU, override);\n"
  );

  replace_in_file(webView,
    "public void setButtonPlumbedToJs(int keyCode, boolean override) {\n" +
    "        switch (keyCode) {",
    "public void setButtonPlumbedToJs(int keyCode, boolean override) {\n" +
    "switch (keyCode) {\n" +
    "case KeyEvent.KEYCODE_MENU:\n"
  );

}

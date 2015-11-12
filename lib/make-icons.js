#!/usr/bin/env node

var path = require('path');
var exec = require('child_process').exec;

var sizes = {
  //for iOS
  "60@3x": 180,
  "60@2x": 120,
  "60": 60,
  "76@2x": 152,
  "76": 76,
  "72@2x": 144,
  "72": 72,
  "40": 40,
  "40@2x": 80,
  "small": 29,
  "small@2x": 58,
  "50": 50,
  "50@2x": 100,

  //For Android
  "ldpi": 36,
  "mdpi": 48,
  "hdpi": 72,
  "xhdpi": 96,
  "xxhdpi": 144,
  "xxxhdpi": 192
};

function puts(error, stdout, stderr) {
  if (stdout) {console.log(stdout);}
  if (stderr) {console.log(stderr);}
}

var helpMessage = "Usage: make-icons ORIGINAL_FILE OUTPUT_PATH [BaseName=icon]\n" +
  "Example: make-icons logo.png /project/res\n" +
  "Creates a collection of images for use as iOS and Android app icons\n" +
  "using ImageMagick to resize from an original graphic.\n\n" +
  "TIPS:\n" +
  "       The original graphic should be LARGER than the largest icon\n" +
  "       resolution otherwise ImageMagick will attempt to scale the\n" +
  "       original UP to fit the appropriate size.\n\n" +
  "SIZES: \n" +
  "       --------------------------------------------------\n" +
  "       |\tIcon Name\t|\tIcon Size\t|\n" +
  "       --------------------------------------------------\n";
for(name in sizes) {
  var nTab = new Array(3 - Math.floor(name.length / 8)).join("\t");
  var size = sizes[name] + "x" + sizes[name] + "px";
  var sTab = new Array(3 - Math.floor(size.length / 8)).join("\t");
  helpMessage += "       |\t" + name + nTab + "|\t" + size + sTab + "|\n";
}
helpMessage += "       --------------------------------------------------\n";

var args = process.argv.slice(2);

if(args.length < 2 || args.indexOf("--help") !== -1) {
  console.log(helpMessage);
  return;
}

exec("which convert", function(error, stdout, stderr) {
  if (!stdout) {
    console.log("Error: Unable to locate the `convert` function from\nImageMagick. Please make sure it is installed.\n");
    console.log(helpMessage);
    return;
  }
  console.log("ImageMagick found at " + stdout);

  //Do stuff here.
  //figure out the file extension (should be png)
  var ext = "png";
  var basename = args[2] || 'icon';
  for(name in sizes) {
    exec("convert " + args[0] + " -resize " + sizes[name] + "x" + sizes[name] + " " + args[1] + "/" + basename + "-" + name + "." + ext, puts);
  }
});

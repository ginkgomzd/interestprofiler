#!/usr/bin/env node

var path = require('path');
var exec = require('child_process').exec;

var iosSizes = {
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
  "50@2x": 100
};

var androidSizes = {
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

var helpMessage = "Usage: make-icons ORIGINAL_FILE OUTPUT_PATH [BaseName=icon] [--ios|--android|--both]\n" +
  "Example: make-icons logo.png /project/res\n" +
  "Creates a collection of images for use as iOS and Android app icons\n" +
  "using ImageMagick to resize from an original graphic.\n\n" +
  "TIPS:\n" +
  "       The original graphic should be LARGER than the largest icon\n" +
  "       resolution otherwise ImageMagick will attempt to scale the\n" +
  "       original UP to fit the appropriate size.\n\n" +
  "IOS SIZES: \n" +
  "       --------------------------------------------------\n" +
  "       |\tIcon Name\t|\tIcon Size\t|\n" +
  "       --------------------------------------------------\n";
var nTab, size, sTab;
for(var name in iosSizes) {
  nTab = new Array(3 - Math.floor(name.length / 8)).join("\t");
  size = iosSizes[name] + "x" + iosSizes[name] + "px";
  sTab = new Array(3 - Math.floor(size.length / 8)).join("\t");
  helpMessage += "       |\t" + name + nTab + "|\t" + size + sTab + "|\n";
}
helpMessage += "       --------------------------------------------------\n";

helpMessage += "ANDROID SIZES: \n" +
"       --------------------------------------------------\n" +
"       |\tIcon Name\t|\tIcon Size\t|\n" +
"       --------------------------------------------------\n";
for(name in androidSizes) {
  nTab = new Array(3 - Math.floor(name.length / 8)).join("\t");
  size = androidSizes[name] + "x" + androidSizes[name] + "px";
  sTab = new Array(3 - Math.floor(size.length / 8)).join("\t");
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
  var sizes = args[3] || '--both';

  if(sizes === '--ios' || sizes === '--both') {
    for(name in iosSizes) {
      exec("convert " + args[0] + " -resize " + iosSizes[name] + "x" + iosSizes[name] + " " + args[1] + "/" + basename + "-" + name + "." + ext, puts);
    }
  }

  if(sizes === '--android' || sizes === '--both') {
    for(name in androidSizes) {
      exec("convert " + args[0] + " -resize " + androidSizes[name] + "x" + androidSizes[name] + " " + args[1] + "/" + basename + "-" + name + "." + ext, puts);
    }
  }

});

#!/usr/bin/env node

//usage: from project root ./lib/makeIndex.js [ProgramDataPath] [occupation|college]

var usage = "usage: from project root ./lib/makeIndex.js  [ProgramDataPath] [Occupation|College]\n" +
  "Program Data path should be to a copy of app/data/programs.js where the line\n" +
  "'export default staticProgramData;' is replaced with: 'module.exports = staticProgramData;'";

//requires
var path = require('path');
var fs = require('fs');

//setup
if (!process.argv[3]) {
  console.log("ERROR: You must indicate WHICH index you want to create");
  console.log(usage);
  process.exit(1);
}

var indexName = process.argv[3];
var objectName = indexName.toLowerCase();
var varName = "staticProgram" + indexName +"Index";
var programPath = process.argv[2];
var rootDir = process.cwd();
var dataPath = path.join(rootDir, 'ember-profiler/app/data');
var outputPath = path.join(dataPath, "program" + indexName + "Index.js");

if (!fs.existsSync(programPath)) {
  console.log("Can't find programs.js at: ", programPath);
  console.log(usage);
  process.exit(1);
}


var staticProgramData = require(programPath);

if(!staticProgramData) {
  console.log("Data couldn't be found in file.");
  console.log(usage);
  process.exit(1);
}

var newIndex = {};

for(var i in staticProgramData) {
  if(staticProgramData.hasOwnProperty(i) && staticProgramData[i].hasOwnProperty(objectName)) {
    var tmp = staticProgramData[i][objectName];
    var pid = staticProgramData[i].id;

    if (typeof(tmp) === "string") {
      tmp = [tmp];
    }

    for (var x in tmp) {
      if (tmp.hasOwnProperty(x)) {
        if (!newIndex.hasOwnProperty(tmp[x])) {
          newIndex[tmp[x]] = [];
        }
        if (newIndex[tmp[x]].indexOf(pid) === -1) {
          newIndex[tmp[x]].push(pid);
        }
      }
    }
  }
}

console.log("Indexing Complete");
console.log("New index contains " + Object.keys(newIndex).length + " entries");

//Add the jsLint stuff to the header
var data = "// jshint ignore: start\n";

//Add the variable name
data += "var " + varName + " = ";

//Convert the new index data to string
data += JSON.stringify(newIndex);

data += ";\n";
//Add the export declaration
data += "export default " + varName + ";";

//Write the result to file
console.log("Writing index to " + outputPath);
fs.writeFileSync(outputPath, data, 'utf8');
console.log("Task Complete");
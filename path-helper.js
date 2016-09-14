'use strict';

var path = require('path');

module.exports.generateFilename = generateFilename;
module.exports.generatePath = generatePath;


function generateFilename(file) {
  return path.basename(
    file.path,
    path.extname(file.path)
  );
}

function generatePath(file) {
  return path.dirname(file.path) + path.sep + generateFilename(file) + '.css';
}

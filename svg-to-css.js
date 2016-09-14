'use strict';

var pathHelper = require('./path-helper.js');
var sprintf = require('sprintf').sprintf;
var cheerio = require('cheerio');

module.exports = function(file, options, content) {
  var xmlData = cheerio.load(content, {
    xmlMode: true,
    normalizeWhitespace: true
  });
  return xmlToCss(file, options, xmlData.xml());
}

function xmlToCss(file, options, content) {
  content = content.replace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n','');
  content = (
    getClassName(options, file) + ' {\n' +
    '  background-image: url(\'data:image/svg+xml;base64,' + new Buffer(content).toString('base64') + '\');\n' +
    '}\n'
  )
  return content;
}

function getClassName(options, file) {
  if (typeof(options.className) === 'function') {
    return options.className(pathHelper.generateFilename(file));
  } else {
    return sprintf(options.className, pathHelper.generateFilename(file));
  }
}
'use strict';

var through = require('through2');
var svgToCss = require('./svg-to-css');
var pathHelper = require('./path-helper.js');

module.exports = function(options) {
  options = options || {};
  options.style = options.style || {};
	options.className = options.className || '.icon.%s';
	options.raw = options.raw || false;

  return through.obj(function(file, encoding, done) {
    var content = file.contents.toString('utf-8');
    var cssContent = svgToCss(file, options, content);
    file.path = pathHelper.generatePath(file);
    file.contents = new Buffer(cssContent);
    return done(null, file);
  });
}

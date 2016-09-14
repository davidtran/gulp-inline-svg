'use strict';

var through = require('through2'),
	cheerio = require('cheerio'),
	path = require('path'),
	clc = require('cli-color'),
	Svg = require('./svg.js'),
	_ = require('lodash'),
  sprintf = require('sprintf').sprintf;


module.exports = function(options) {
  options = options || {};
  options.style = options.style || {};
	options.className = options.className || '.icon.%s';
	options.raw = options.raw || false;

  return through.obj(function(file, encoding, done) {

    var content = file.contents.toString('utf-8');


    var xmlData = cheerio.load(content, {
      xmlMode: true,
      normalizeWhitespace: true
    });



    if (options.raw === false) {
      content = buildContent(file, options, xmlData.xml());
      file.path = generatePath(file);
    }

    file.contents = new Buffer(content);

    return done(null, file);
  });
}

function buildContent(file, options, content) {
  content = content.replace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n','');
  content = (
    (
      (typeof options.className === 'function')
      ? options.className(generateFilename(file))
      : sprintf(options.className, generateFilename(file))
    ) + ' {\n' +
    '  background-image: url(\'data:image/svg+xml;base64,' + new Buffer(content).toString('base64') + '\');\n' +
    '}\n'
  )

  return content;
}

function generateFilename(file) {
  return path.basename(
    file.path,
    path.extname(file.path)
  );
}

function generatePath(file) {
  return path.dirname(file.path) + path.sep + generateFilename(file) + '.css';
}

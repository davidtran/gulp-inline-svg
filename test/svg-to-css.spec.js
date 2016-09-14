'use strict';

var svgToCss = require('../svg-to-css.js');
var fs = require('fs');

describe('svgToCss', function() {

  var fileContent = fs.readFileSync('./icons/pattern_01.svg');
  var file = {
    path: '/path/to/pattern_01.svg'
  };

  it('generate class name from pattern', function() {
    var css = svgToCss(file, {className: '.icon.%s'}, fileContent);
    expect(css).toContain('.icon.pattern_01');
  });

  it('generate class name from function', function() {
    var css = svgToCss(file, {className: function(name) {
      return '.new-icon .' + name;
    }}, fileContent);
    expect(css).toContain('.new-icon .pattern_01');
  });

});
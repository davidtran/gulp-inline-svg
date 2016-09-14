'use strict';

var pathHelper = require('../path-helper.js');

describe('path-helper.js', function() {

  it('generate file name', function() {
    expect(pathHelper.generateFilename({
      path: '/path/to/some/pattern_01.svg'
    })).toEqual('pattern_01');
  });

  it('generate path', function() {
    expect(pathHelper.generatePath({
      path: '/path/to/some/pattern_01.svg'
    })).toEqual('/path/to/some/pattern_01.css');
  });

});
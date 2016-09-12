'use strict'

var _ = require('lodash')
var path = require('path')
var sprintf = require('sprintf').sprintf

module.exports = Svg

function Svg() {
  this.style = ''
  this.tags = ['path','rect','circle','ellipse','line','polyline','polygon','g','text']
}

Svg.prototype.normalizeKey = function(key) {
  return _.escape(key.replace(/[A-Z]/g, function(letter) {
    return '-' + letter.toLowerCase()
  }));
}

Svg.prototype.normalizeValue = function(value) {
  return _.escape(value)
}

Svg.prototype.genName = function(file) {
  return path.basename(
    file.path,
    path.extname(file.path)
  )
}

Svg.prototype.genPath = function(file) {
  return path.dirname(file.path) + path.sep + this.genName(file) + '.css'
}

Svg.prototype.buildContent = function(file, options, content) {
  content = content.replace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n','')
  content = (
    (
      (typeof options.className === 'function')
      ? options.className(this.genName(file))
      : sprintf(options.className, this.genName(file))
    ) + ' {\n' +
    '  background-image: url(\'data:image/svg+xml;base64,' + new Buffer(content).toString('base64') + '\');\n' +
    '}\n'
  )

  return content
}

Svg.prototype.inline = function(style) {
  var thisis = this
  this.style = ((function(object){
    var set = [];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        set.push(thisis.normalizeKey(key) + ':' + thisis.normalizeValue(object[key].toString()))
      }
    }

    return set
  })(style)).join(';')
}
Svg.prototype.addStyle = function(style) {
  style = style || ''
  style += this.style
  return _.trim(style, [' ', ';', '\n', '	'])
}

Svg.prototype.read = function(obj, tag) {
  if (_.isObject(obj) || _.isArray(obj)) {
    for (var x in obj) {
      if (obj.hasOwnProperty(x)) {
        if (x === '$') {
          if (_.indexOf(this.tags, tag) !== -1) {
            obj[x].style = this.addStyle(obj[x].style)
          }
        } else {
          obj[x] = this.read(obj[x], _.isArray(obj) ? tag : x)
        }
      }
    }
  }
  return obj
}

'use strict'

var through = require('through2'),
	xml2js = require('xml2js'),
	path = require('path'),
	clc = require('cli-color'),
	Svg = require('./svg.js'),
	_ = require('lodash'),
  builder = require('./xmlbuilder.js')

module.exports = function(options) {
  options = options || {}
  options.style = options.style || {}
	options.className = options.className || '.icon.%s'
	options.raw = options.raw || false

  return through.obj(function(file, encoding, done) {
    var content = file.contents.toString('utf-8')
    var parser = new xml2js.Parser({
      explicitChildren: true,
      preserveChildrenOrder: true
    })
    var svg = new Svg()

    parser.parseString(content, function(err, data) {
      if (err) {
        console.error(
          clc.red(
            'Can\'t not process file ' + file.path + ' - ' + error
          )
        )

        file.contents = null
        return done(null, file)
      }

      svg.inline(options.style)

      data = svg.read(data)

      if (_.has(options, 'width')) {
				if (_.has(data, 'svg.$')) {
					data.svg.$.width = options.width
				}
			}

			if (_.has(options, 'height')) {
				if (_.has(data, 'svg.$')) {
					data.svg.$.height = options.height
				}
			}

			content = builder(data)

			if (options.raw === false) {
				content = svg.buildContent(file, options, content)
				file.path = svg.genPath(file)
			}

			file.contents = new Buffer(content)

			return done(null, file)
    })
  })
}
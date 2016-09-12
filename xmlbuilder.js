var builder = require('xmlbuilder')

module.exports = function buildXml(json) {
  var xmldec = {
    version: '1.0',
    standalone: true,
    encoding: 'UTF-8'
  };

  var root = builder.create('svg', xmldec, null, {
    headless: true
  })

  Object.keys(json.svg.$).map(function(at) {
    root.att(at, json.svg.$[at])
  })

  traverse(json.svg.$$, root)
  return root.end({
    pretty: true
  })
}

function traverse(tags, root) {
  for(var i in tags) {
    var item = root.ele(tags[i]['#name'], tags[i]['$'])
    if (tags[i].$$) traverse(tags[i].$$, item)
  }
}
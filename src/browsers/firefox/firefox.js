var data = require('sdk/self').data
var pageMod = require('sdk/page-mod')
var scripts = [
  data.url('munchdb.js')
]
var styles = [
  data.url('munchdb.css')
]

var includePatterns = [
  '*.deliveroo.co.uk',
  '*.just-eat.co.uk',
  '*.hungryhouse.co.uk'
]

pageMod.PageMod({
  include: includePatterns,
  contentScriptFile: scripts,
  contentStyleFile: styles,
  contentScriptWhen: 'end'
})

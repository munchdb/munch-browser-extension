var data = require('sdk/self').data
  , pageMod = require('sdk/page-mod')
  , scripts = [
      data.url('munchdb.js')
    ]
  , styles = [
      data.url('munchdb.css')
  ]

pageMod.PageMod({
  include: 'http://www.just-eat.co.uk/*',
  contentScriptFile : scripts,
  contentStyleFile  : styles,
  contentScriptWhen : 'start'
})

pageMod.PageMod({
  include: 'https://hungryhouse.co.uk/*',
  contentScriptFile : scripts,
  contentStyleFile  : styles,
  contentScriptWhen : 'start'
})

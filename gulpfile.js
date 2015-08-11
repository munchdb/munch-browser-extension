var gulp = require('gulp')
var path = require('path')
var merge = require('event-stream').merge
var webpack = require('webpack-stream')
var $ = require('gulp-load-plugins')()

/**
 * Public tasks
 */

gulp.task('clean', function () {
  return pipe('./tmp', [$.clean()])
})

gulp.task('build', function (cb) {
  $.runSequence('clean', 'css', 'js', 'images', 'chrome', 'opera', 'safari', 'firefox', cb)
})

gulp.task('default', ['build'], function () {
  gulp.watch(['./src/**/*'], ['default'])
})

gulp.task('dist', ['build'], function (cb) {
  $.runSequence('firefox:xpi', 'chrome:zip', 'chrome:crx', 'opera:nex', cb)
})

/**
 * Private tasks
 */

// #TODO #LATEST CSS needs to concatenate and compile to ./tmp/munchdb.css
gulp.task('css', function () {
  return pipe('./src/styles/**/*.css', [
    $.autoprefixer({cascade: true}),
    $.concat('munchdb.css')
  ], './tmp')
})

gulp.task('js', function () {
  return pipe([
    './src/**/*.js',
    '!./src/browsers/**/*'
  ], [
    webpack(require('./webpack.config.js'))
  ], './tmp')
})

gulp.task('images', function () {
  return pipe('./src/images/**/*', './tmp/images')
})

// Chrome
gulp.task('chrome', function () {
  return merge(
    pipe('./icons/**/*', './tmp/chrome/icons'),
    pipe([
      './tmp/munchdb.css',
      './tmp/munchdb.js',
      './src/browsers/chrome/**/*'
    ], './tmp/chrome/')
  )
})

gulp.task('chrome:zip', function () {
  return pipe('./tmp/chrome/**/*', [$.zip('chrome.zip')], './dist')
})

gulp.task('chrome:_crx', function (cb) {
  $.run('"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"' +
    ' --pack-extension=' + path.join(__dirname, './tmp/chrome') +
    ' --pack-extension-key=' + path.join(process.env.HOME, '.ssh/chrome.pem')
  ).exec(cb)
})

gulp.task('chrome:crx', ['chrome:_crx'], function () {
  return pipe('./tmp/chrome.crx', './dist')
})

// Opera
gulp.task('opera', ['chrome'], function () {
  return pipe('./tmp/chrome/**/*', './tmp/opera')
})

gulp.task('opera:nex', function () {
  return pipe('./dist/chrome.crx', [$.rename('opera.nex')], './dist')
})

// Safari
gulp.task('safari', function () {
  return merge(
    pipe('./icons/**/*', './tmp/safari/munchdb.safariextension/icons'),
    pipe([
      './tmp/munchdb.css',
      './tmp/munchdb.js',
      './src/browsers/safari/**/*'
    ], './tmp/safari/munchdb.safariextension/')
  )
})

// Firefox
gulp.task('firefox', function () {
  return merge(
    pipe('./icons/**/*', './tmp/firefox/data/icons'),
    pipe([
      './tmp/munchdb.css',
      './tmp/munchdb.js'
    ], './tmp/firefox/data'),
    pipe(['./src/browsers/firefox/firefox.js'], './tmp/firefox/lib'),
    pipe('./src/browsers/firefox/package.json', './tmp/firefox')
  )
})

gulp.task('firefox:xpi', function (cb) {
  $.run('cd ./tmp/firefox && jpm xpi').exec(function () {
    pipe('./tmp/firefox/@munchdb-*.xpi', './dist')
    return cb()
  })
})

/**
 * Helpers
 */

function pipe (src, transforms, dest) {
  if (typeof transforms === 'string') {
    dest = transforms
    transforms = null
  }
  var stream = gulp.src(src)
  transforms && transforms.forEach(function (transform) {
    stream = stream.pipe(transform)
  })
  if (dest) stream = stream.pipe(gulp.dest(dest))
  return stream
}

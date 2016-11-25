var gulp = require('gulp')
var webpack = require('webpack-stream')
var serve = require('gulp-serve')
var config = require('config')
var jsonServer = require('json-server')

// Webpack
gulp.task('webpack', function () {
  return gulp.src('./src/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist'))
})

// JSON API Server - run a REST server via a simple json file
gulp.task('serve:api', function (cb) {
  var apiServer = jsonServer.create()
  var router = jsonServer.router('db.json')

  apiServer.use(jsonServer.defaults())
  apiServer.use(router)
  apiServer.listen(config.get('api.port'))

  cb()
})

// Simple Server
gulp.task('serve:web', serve({
  root: './dist',
  port: config.get('server.port'),
  hostname: '0.0.0.0'
}))

// Watch for changes and reload stuff
gulp.task('watch', function () {
  gulp.watch('./src/**/*', ['webpack'])
})

gulp.task('default', ['webpack', 'serve:web', 'serve:api', 'watch'])

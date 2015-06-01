/**
 * Gulpfile
 *
 * `$ gulp` will create a production build
 * `$ gulp watch` will start the development server and watch files
 */

 // Configuration
var SCRIPTS = 'app/scripts/**/*.js';
var JS_ENTRY = 'app/scripts/main.js';
var JS_PUBLIC_DEST = 'public/scripts';
var JS_DEST_DIRECTORY = 'dist/scripts';
var JS_DEST_FILENAME = 'main.js';
var IMG_SRC = 'public/img';
var IMG_DEST = 'dist/img';
var NIGHTWATCH_CONFIG = './tests/e2e/nightwatch.json';
var LIVERELOAD_PORT = 35731;
var SERVER_URL = 'http://localhost:8743';

var cp = require('child_process');
var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
// var browserify = require('gulp-faster-browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var nightwatch = require('gulp-nightwatch');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
  return cp.spawnSync('rm', ['-rf', 'dist']);
});

// Replace placeholders in app/index.html
gulp.task('html:dev', function() {
  return gulp.src('app/index.html')
    .pipe(htmlreplace({
      'js': [
        'http://localhost:' + LIVERELOAD_PORT + '/livereload.js',
        '/scripts/main.js'
      ]
    }))
    .pipe(gulp.dest('public'));
});
gulp.task('html:dist', function() {
  return gulp.src('app/index.html')
    .pipe(htmlreplace({
      'js': '/scripts/main.js'
    }))
    .pipe(gulp.dest('dist'));
});

// Minify images in place
gulp.task('images:dev', function() {
  return gulp.src(IMG_SRC + '/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(IMG_SRC));
});
gulp.task('images:dist', function() {
  return gulp.src(IMG_SRC + '/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(IMG_DEST));
});

// Copy fonts
gulp.task('fonts:dist', function() {
  return cp.spawnSync('cp', ['-R', 'public/fonts', 'dist/fonts']);
});

// Lint JavaScript and JSX
gulp.task('eslint', function() {
  return gulp.src(SCRIPTS)
    .pipe(eslint())
    .pipe(eslint.format());
});

// Browserify for development
// TODO: needs a sourcemap
gulp.task('browserify:dev', function() {
  return gulp.src(JS_ENTRY)
    .pipe(browserify({
      // insertGlobals : true,
      // read: false,
      transform: ['babelify']
    }))
    .pipe(concat(JS_DEST_FILENAME))
    .pipe(gulp.dest(JS_PUBLIC_DEST))
    .pipe(livereload());
});
// Browserify for production
gulp.task('browserify:dist', function() {
  return gulp.src(JS_ENTRY)
    .pipe(watchify({
      watch: true
    }))
    .pipe(browserify({
      // insertGlobals : true,
      transform: ['babelify']
    }))
    .pipe(concat(JS_DEST_FILENAME))
    .pipe(uglify())
    .pipe(gulp.dest(JS_DEST_DIRECTORY));
});

// JavaScript development build
gulp.task('js:dev', function(cb) {
  runSequence('eslint', 'browserify:dev', cb);
});
// JavaScript production build
gulp.task('js:dist', function(cb) {
  runSequence('eslint', 'browserify:dist', cb);
});

// Full development build
gulp.task('build:dev', function(cb) {
  runSequence('clean', 'images:dev', 'js:dev', 'html:dev', cb);
});
// Full production build
gulp.task('build:dist', function(cb) {
  runSequence('clean', 'images:dist', 'fonts:dist', 'js:dist', 'html:dist', cb);
});

// End-to-end tests
gulp.task('e2e:firefox', function() {
  return gulp.src('')
    .pipe(nightwatch({
      configFile: NIGHTWATCH_CONFIG
    }));
});
gulp.task('e2e:chrome', function() {
  return gulp.src('')
    .pipe(nightwatch({
      configFile: NIGHTWATCH_CONFIG,
      cliArgs: ['--env chrome']
    }));
});

// Start the Express and livereload servers
gulp.task('serve', function() {
  // Start livereload server
  livereload.listen(LIVERELOAD_PORT);

  // Start the Express server
  cp.spawn('node', ['server/main.js']);

  // Open app in browser
  return cp.spawn('open', [SERVER_URL]);
});

// Watch task for development
gulp.task('watch', ['build:dev', 'serve'], function() {
  gulp.watch(SCRIPTS, ['js:dev']);
});

// Production build is the default task
gulp.task('default', ['build:dist']);

var cp = require('child_process');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var nightwatch = require('gulp-nightwatch');
var runSequence = require('run-sequence');

// Source paths
var scripts = 'app/scripts/**/*.*';
var images = 'public/img';
var nightwatchConfig = './tests/e2e/nightwatch.json';

// Minify images in place
gulp.task('images', function() {
  return gulp.src(images + '/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(images));
});

// Lint JavaScript and JSX
gulp.task('eslint', function() {
  return gulp.src(scripts)
    .pipe(eslint())
    .pipe(eslint.format());
});

// Browserify for development
// TODO: needs a sourcemap
gulp.task('browserify:dev', function() {
  return gulp.src('app/scripts/main.js')
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(livereload());
});
// Browserify for production
gulp.task('browserify:dist', function() {
  return gulp.src('app/scripts/main.js')
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

// End-to-end tests
gulp.task('e2e:firefox', function() {
  return gulp.src('')
    .pipe(nightwatch({
      configFile: nightwatchConfig
    }));
});
gulp.task('e2e:chrome', function() {
  return gulp.src('')
    .pipe(nightwatch({
      configFile: nightwatchConfig,
      cliArgs: ['--env chrome']
    }));
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
gulp.task('build:dev', ['images', 'js:dev']);
// Full production build
gulp.task('build:dist', ['images', 'js:dist']);

// Start the Express server
gulp.task('serve', function() {
  return cp.spawn('node', ['server/main.js']);
});

// Watch task for development
gulp.task('watch', ['build:dev', 'serve'], function() {
  // Start livereload server
  livereload.listen(35731);

  gulp.watch(scripts, ['js:dev']);
});

// Production build is the default task
gulp.task('default', ['build:dist']);
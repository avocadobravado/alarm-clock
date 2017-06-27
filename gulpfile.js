var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var buildProduction = utilities.env.production;
var del = require('del');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
// var lib = require('bower-files')();

var lib = require('bower-files')({
  "overrides":{
    "materialize" : {
      "main": [
        // "less/materialize.less",
        "dist/css/materialize.css",
        "dist/js/materialize.js"
        // "fonts/roboto/Roboto-Regular.woff2", // ASK TEACHER? lol - Fonts not building
        // "fonts/roboto/Roboto-Regular.woff"
      ]
    }
  }
});

// Browserify task
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

// Concat consolidates all js files into one
gulp.task('concatInterface', function() {
  return gulp.src(['./js/front-end.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

// Uglify will minify scripts into one line
gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

// This will clean up our environment before we make a build
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

// JS Hint
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concats all js files into one vendor.js
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});


// Concats all vendor CSS files into one
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

// Combines bower JS and bower CSS
gulp.task('bower', ['bowerJS', 'bowerCSS']);

// Browsersync for live reloading
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
});

// Gulp serve task for live reloading
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
});

// watch all of the files inside of our development js folder and whenever one of the files changes, run the task jsBuild.
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function(){
  browserSync.reload();
});

// If production, minify if not -- browserify, also run bower
gulp.task('build', ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
});

// Import modules
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    mozjpeg = require('imagemin-mozjpeg'),
    svgo = require('imagemin-svgo'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

// Import projects
var header_1_blue = require('./data/header/header_1_blue');
var header_1_white = require('./data/header/header_1_white');
var header_2_blue = require('./data/header/header_2_blue');
var header_2_white = require('./data/header/header_2_white');
var header_3_blue = require('./data/header/header_3_blue');
var header_3_white = require('./data/header/header_3_white');
var price_1 = require('./data/price/price_1');

var $ = price_1; // Active project


gulp.task('html', function () {
  return gulp.src($.src.html)
          .pipe(gulp.dest('public/' + $.name))
          .pipe(browserSync.reload( {stream: true} ));
});

gulp.task('sass', function () {
  return gulp.src(['src/default/sass/**/*.+(scss|sass)', $.src.sass])
          .pipe(sass({ outputStyle: 'expanded' }))
          .pipe(autoprefixer())
          // .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest('public/' + $.name + '/css/'))
          .pipe(browserSync.reload( {stream: true} ));
});

gulp.task('js', function () {
  return gulp.src($.src.js)
          .pipe(gulp.dest('public/' + $.name + '/js/'))
          .pipe(browserSync.reload( {stream: true} ));
});

gulp.task('libs-css', function () {
  return gulp.src($.src.libsCss)
    .pipe(concat('libs.css'))
    .pipe(uglifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/' + $.name + '/css/'))
    .pipe(browserSync.reload( {stream: true} ));
});

gulp.task('libs-js', function () {
  return gulp.src($.src.libsJs)
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/' + $.name + '/js/'))
    .pipe(browserSync.reload( {stream: true} ));
});

gulp.task('images', function () {
  return gulp.src($.src.images)
          .pipe(cache(imagemin([
              mozjpeg(),
              pngquant(),
              svgo()
            ], { verbose: true })))
          .pipe(gulp.dest('public/' + $.name + '/images/'));
});

gulp.task('fonts', function () {
  return gulp.src($.src.fonts)
          .pipe(gulp.dest('public/' + $.name + '/fonts/'))
});

gulp.task('icons', function () {
  return gulp.src('src/default/icons/*')
          .pipe(gulp.dest('public/' + $.name + '/icons/'))
});

gulp.task('favicon', function () {
  return gulp.src($.src.favicon)
          .pipe(gulp.dest('public/' + $.name + '/favicon/'))
});

gulp.task('watch', function () {
  gulp.watch($.src.html, gulp.parallel('html'));
  gulp.watch(['src/default/sass/**/*.+(scss|sass)', $.src.sass], gulp.parallel('sass'));
  gulp.watch($.src.js, gulp.parallel('js'));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './public/' + $.name
    }
  });
});

gulp.task('clear', function() {
   return cache.clearAll();
});

gulp.task('server', gulp.parallel('watch', 'browser-sync'));

gulp.task('default', gulp.series('html', 'sass', 'js', 'images', 'icons', 'server'));
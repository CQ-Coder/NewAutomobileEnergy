"use strict";

var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');
// var sass = require('gulp-sass-china');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var uglify = require('gulp-uglify');


gulp.task('clean', function (cb) {
    return del(['dist/*'], cb);
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('image', function () {
    return gulp.src('src/imgs/*')
      .pipe(gulp.dest('dist/imgs'))
      .pipe(browserSync.stream());
});

// gulp.task('css', function () {
//     return gulp.src('src/styles/*.scss')
//         .pipe(sourcemaps.init())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('dist/css'))
//         .pipe(browserSync.stream());
//
// });

gulp.task('scss', function () {
    return sass('scss/*.scss', {sourcemap: true})
      .on('error', sass.logError)
      .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/css'))
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream());

});

gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        // .pipe(sourcemaps.init())
        // .pipe(concat('main.js'))
        // .pipe(gulp.dest('dist/js'))
        // .pipe(rename({suffix: '.min'}))
        // .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/imgs/*', ['image']);
    gulp.watch('scss/**/*.scss', ['scss']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/**/*.css', ['css']);
});

//static server
gulp.task('staticServer', ['html', 'image', 'scss', 'css', 'js', 'watch'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

gulp.task('server', ['staticServer']);

gulp.task('default', ['clean', 'html', 'image', 'scss', 'css', 'js']);

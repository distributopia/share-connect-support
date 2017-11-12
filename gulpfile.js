
'use strict';

const autoprefixer   = require('gulp-autoprefixer'),
      babel          = require('gulp-babel'),
      concat         = require('gulp-concat'),
      cssnano        = require('gulp-cssnano'),
      eslint         = require('gulp-eslint'),
      gulp           = require('gulp'),
      notify         = require('gulp-notify'),
      plumber        = require('gulp-plumber'),
      rename         = require('gulp-rename'),
      runSequence    = require('run-sequence'),
      sass           = require('gulp-sass'),
      stylelint      = require('gulp-stylelint'),
      uglify         = require('gulp-uglify');

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Ouch! Error running Gulp",
      message: "Error: <%= error.message %>"
    })
  });
}

gulp.task('scripts', function() {
  return gulp.src('src/*.js')
             .pipe(babel({
                presets: ['env']
              }))
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(concat('share.js'))
             .pipe(gulp.dest('example/'))
             .pipe(rename({suffix: '.min'}) )
             .pipe(uglify())
             .pipe(gulp.dest('example/'))
});

gulp.task('styles:lint', function() {
  return gulp.src('src/*.scss')
             .pipe(stylelint({
                failAfterError: false,
                reporters: [
                  {formatter: 'verbose', console: true}
                ]
              }));
});

gulp.task('styles:build', function() {
  return gulp.src('src/styles.scss')
             .pipe(customPlumber('Ouch! Error Running StyleLint'))
             .pipe(sass({errLogToConsole: true}))
             .pipe(autoprefixer(['last 3 versions', 'IE 10', 'iOS 9', 'Android 4']))
             .pipe(gulp.dest('example/'))
             .pipe(rename({ suffix: '.min' }))
             .pipe(cssnano())
             .pipe(gulp.dest('example/'))
});

gulp.task('watch', function() {
  gulp.watch('./src/*.scss', ['styles:build']);
  gulp.watch('./src/*.js', ['scripts']);
});

gulp.task('default', function() {
  runSequence('styles:lint', 'styles:build', 'scripts', 'watch');
});

var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var del = require('del');

var paths = {
  sass: ['./scss/**/*.scss'],
  scripts: ['./www/js/**/*.js', '!./www/js/bundle.js', '!./www/js/bundle.min.js']
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./www/js'))
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./www/js'));
});


gulp.task('sass', function(done) {
  gulp.src('./scss/bundle.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('compile-assets', ['scripts', 'sass']);

gulp.task('default', ['watch', 'scripts', 'sass']);


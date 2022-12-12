const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      uglify = require('gulp-uglify'),
      uglifycss = require('gulp-uglifycss'),
      concat = require('gulp-concat'),
      babel = require('gulp-babel')


function appHTML() {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'))
}

function appCSS() {
    return gulp.src('src/assets/css/**/*.css')
        .pipe(uglifycss({ "uglyComments": true }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build/assets/css'))
}

function appJS() {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(babel({ presets: ['ENV'] }))
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('build/assets/js'))
}

function appIMG() {
    return gulp.src('src/assets/imgs/**/*.*')
        .pipe(gulp.dest('build/assets/imgs'))
}

gulp.task('appHTML', appHTML)
gulp.task('appCSS', appCSS)
gulp.task('appJS', appJS)
gulp.task('appIMG', appIMG)

module.exports = {
    appHTML,
    appCSS,
    appJS,
    appIMG
}
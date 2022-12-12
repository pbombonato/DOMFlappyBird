const gulp = require('gulp')

function depsFonts(cb) {
    return gulp.src('src/assets/fonts/*.*') 
        .pipe(gulp.dest('build/assets/fonts'))
}

module.exports = {
    depsFonts
}
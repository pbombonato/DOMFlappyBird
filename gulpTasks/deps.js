const gulp = require('gulp')

function depsFonts(cb) {
    return gulp.src('src/assets/fonts/*.*') 
        .pipe(gulp.dest('docs/assets/fonts'))
}

module.exports = {
    depsFonts
}
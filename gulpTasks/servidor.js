const gulp = require('gulp'),
      { watch, series } = require('gulp'),
      webserver = require('gulp-webserver')

function servidor() {
    return gulp.src('build')
        .pipe(webserver({
            port:8080,
            open:true,
            livereload:true
        }))
}

function monitorarArquivos(callback) {
    watch('src/**/*.html', series('appHTML'))
    watch('src/**/*.css', series('appCSS'))
    watch('src/**/*.js', series('appJS'))
    watch('src/assets/imgs/*.*', series('appIMG'))

    return callback()
}

module.exports = {
    servidor,
    monitorarArquivos
}
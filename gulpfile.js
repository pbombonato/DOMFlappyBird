const gulp = require('gulp'),
      { series, parallel } = require('gulp'),
      { appHTML, appCSS, appJS, appIMG } = require('./gulpTasks/app'),
      { depsCSS, depsFonts } = require('./gulpTasks/deps'),
      { monitorarArquivos, servidor } = require('./gulpTasks/servidor')

exports.default = series(
    parallel( appHTML, appCSS, appJS, appIMG, depsFonts ),
    servidor,
    monitorarArquivos
)
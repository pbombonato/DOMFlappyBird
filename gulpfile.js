const { series, parallel } = require('gulp'),
      { appHTML, appCSS, appJS, appIMG } = require('./gulpTasks/app'),
      { depsFonts } = require('./gulpTasks/deps'),
      { monitorarArquivos, servidor } = require('./gulpTasks/servidor')

exports.default = series(
    parallel( appHTML, appCSS, appJS, appIMG, depsFonts ),
    servidor,
    monitorarArquivos
)
const webpack = require('webpack'),
      MiniCSSExtractPlugin = require('mini-css-extract-plugin'),
      CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
      HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')

const modoDev = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        filename: 'script.js',
        path: __dirname + '/docs'
    },
    devServer: {
        static: "./docs",
        port: 9000
    }, 
    optimization: {
        minimize: true,
        minimizer: [
            // new CssMinimizerPlugin(),
            new HtmlMinimizerPlugin({
                minimizerOptions: [
                  {
                    collapseWhitespace: true,
                  }
                ]
            })
        ]
    },
    // plugins: [
    //     new MiniCSSExtractPlugin({
    //         filename: "style.css"
    //     })
    // ],
    module: {
        rules: [{
            test: /\.html$/i,
            loader: "html-loader",
          },{
            test: /\.css$/,
            use: [
                // MiniCSSExtractPlugin.loader,
                'css-loader',
                'style-loader'
            ]
        }, {
            test: /\.(png|jpg|jpeg|svg|gif|ico)$/,
            use: [ 'file-loader' ]
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                
              }
            }
        }]
    }
}
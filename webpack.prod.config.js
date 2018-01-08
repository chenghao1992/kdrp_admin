const webpack = require('atool-build/lib/webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime')
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: true
  }])

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval'
    webpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        './src/index.js'
      ]
    }])

  } else {
    webpackConfig.babel.plugins.push('dev-expression')
    webpackConfig.entry = {
      index: './src/_index.js',
      //areas: ['./src/utils/areas.js'],

    }
    /*webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: '!!html!./src/index.html',
      showErrors: true,
      hash:true
    }))*/
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    template: '!!html!./src/index.html',
    showErrors: true,
    hash:true
  }))

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'NOT_PROD': false
  }))


  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter(function (plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin)
  }).filter(function (plugin) {
    return !(plugin instanceof webpack.optimize.UglifyJsPlugin)
  })

  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      ascii_only: true,
    },
    compress:{
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  }))


  webpackConfig.hash= true;

  /*webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    filename:"areas",
    chunks:"areas",
    //children:true,
    async:true
  }))*/

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.less$/
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/
      loader.test = /\.less$/
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.css$/
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/
      loader.test = /\.css$/
    }
    if (loader.test.toString().indexOf('\\.(png|jpg|jpeg|gif') > -1) {
      loader.exclude = /node_modules/;
      loader.loader = require.resolve('url-loader') + '?limit=100&name=assets/[name].[ext]'
    }
  })

  return webpackConfig
}

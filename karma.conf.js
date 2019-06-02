// var appConfig = require('./config')

module.exports = function (config) {
  'use strict'

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    files: [
      'src/js/*.js',
      {
        pattern: 'test/*.test.js',
        watched: false,
        served: true,
        included: true
      }
      // 'test/*.test.js'
    ],
    preprocessors: {
      'src/js/*.js': ['babel'],
      'test/**/*.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['@babel/preset-env'],
        sourceMap: 'inline'
      },
      filename(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js')
      },
      sourceFileName(file) {
        return file.originalPath
      }
    },

    frameworks: ['jasmine'],
    exclude: [],
    reporters: 'progress',
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false
  })
}

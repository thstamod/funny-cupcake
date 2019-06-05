/* eslint-disable strict */

'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const gulpStylelint = require('gulp-stylelint')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')
const uglify = require('gulp-uglify')
const pump = require('pump')
const pkg = require('./package.json')
const header = require('gulp-header')
const Server = require('karma').Server

sass.compiler = require('node-sass')

gulp.task('sass', () =>
  gulp
    .src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass
        .sync({
          sourceMap: true,
          outputStyle: 'expanded',
          sourceMapContents: true,
          precision: 6
        })
        .on('error', sass.logError)
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
)

gulp.task('watch-source', () => {
  gulp.watch(
    './src/scss/**/*.scss',
    gulp.series('stylelint', 'sass', 'autoprefixer')
  )
  gulp.watch('./src/js/**/*.js', gulp.series('eslint', 'babel'))
})

gulp.task('autoprefixer', () =>
  gulp
    .src(['dist/css/*.css'])
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'))
)

gulp.task('stylelint', () =>
  gulp.src('src/scss/**/*.scss').pipe(
    gulpStylelint({
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ],
      syntax: 'scss',
      configFile: '.stylelintrc'
    })
  )
)

gulp.task('css-min', () =>
  gulp
    .src([
      'dist/css/**/*.css',
      '!dist/css/**/*.min.css',
      '!dist/css/icons/**/*css'
    ])
    .pipe(sourcemaps.init())
    .pipe(
      cleanCSS(
        {
          level: 1,
          sourceMap: true,
          sourceMapInlineSources: true,
          format: {
            breaksWith: 'lf'
          },
          debug: true
        },
        (details) => {
          console.log(`${details.name}: ${details.stats.originalSize}`)
          console.log(`${details.name}: ${details.stats.minifiedSize}`)
        }
      )
    )
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('dist/css'))
)

gulp.task('babel', () =>
  gulp
    .src('src/js/*.js')
    .pipe(
      babel({
        exclude: './node_modules/**'
      })
    )
    .pipe(gulp.dest('dist/js/'))
)

gulp.task('eslint', () =>
  gulp
    .src(['src/js/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
)

gulp.task('js-minify', (cb) => {
  const banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
  ].join('\n')
  pump(
    [
      gulp.src(['dist/js/*.js', '!dist/js/*.min.js']),
      uglify({
        mangle: false
      }),
      rename({
        suffix: '.min'
      }),
      header(banner, {
        pkg
      }),
      gulp.dest('dist/js')
    ],
    cb
  )
})

gulp.task('test', (done) => {
  const config = {
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }
  const server = new Server(config, done)
  server.start()
})

// dev
exports.watch = gulp.series('watch-source')

exports.js_prepare = gulp.series('eslint', 'babel', 'js-minify')
exports.css_prepare = gulp.series('css-min')

exports.test = gulp.task('test')

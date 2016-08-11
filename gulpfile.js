var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var htmlInjector = require("bs-html-injector");
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var tsconfig = tsc.createProject('tsconfig.json');
var webpack = require('webpack-stream');
var gulpCC = require("gulp-closurecompiler");


var config = {
  siteUrl: "http://angular2.0-rc.5-gulp-webpack-starter/",
  port: 9000,
  projectFilesRoot: './src',
  tsFiles: './src/app/**/*.ts',
  tsFilesPath: './src/app/',
  tsEntryFileName: 'boot',
  jsFiles: './src/app/**/*.js',
  angularHtmlFiles: './src/app/**/*.html',
  angularSassFiles: './src/app/**/*.scss',
  jsFilesPath: './js/',
  jsMainFileName: 'main.js',
  sassFiles: './src/sass/**/*.scss',
  cssFilesPath: './css/',
  cssMainFileName: 'style.css',
}
config.browserSyncWatchFiles = [
  config.cssFilesPath + config.cssMainFileName,
  config.jsFilesPath + config.jsMainFileName,
]
config.browserSyncInjectHtmlFiles = [
  'index.php',
  './resources/views/**/*.php'
];

// watch
gulp.task('watch', function() {
  //watch(config.tsFiles, function() {
  //  gulp.start(['ts-lint', 'compile-ts']);
  //});
  //watch(config.jsFiles, function() {
  //  gulp.start('js-concat');
  //});

  // watch([config.tsFiles, config.angularHtmlFiles, config.angularSassFiles], function() {
  //   gulp.start('webpack');
  // });
  watch(config.sassFiles, function() {
    gulp.start('sass');
  });
  watch(config.cssFilesPath + config.cssMainFileName, function() {
    gulp.start('autoprefixer');
  });
});

//// js concat
//gulp.task('js-concat', ['compile-ts'], function() {
//  gulp.src([config.jsFiles])
//    .pipe(concat(config.jsMainFileName))
//    .pipe(gulp.dest(config.jsFilesPath));
//});

// sass
gulp.task('sass', function () {
  gulp.src(config.sassFiles)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(config.cssFilesPath));
});

// autoprefixer
gulp.task('autoprefixer', function () {
  return gulp.src(config.cssFilesPath + config.cssMainFileName)
    .pipe(autoprefixer({
      browsers: ['> 0%'],
      cascade: false
    }))
    .pipe(gulp.dest(config.cssFilesPath));
});

//// ts-lint
//gulp.task('ts-lint', function() {
//  return gulp.src(config.tsFiles)
//    .pipe(tslint())
//    .pipe(tslint.report('prose', {
//      emitError: false
//    }))
//})
//
//// compile-ts
//gulp.task('compile-ts', function() {
//  var tsResult = gulp
//    .src([config.tsFiles])
//    //.pipe(sourcemaps.init())
//    .pipe(tsc(tsconfig));
//
//  return tsResult.js
//    //.pipe(sourcemaps.write('.'))
//    .pipe(gulp.dest(config.tsFilesPath));
//});

gulp.task('webpack', function() {
  webpack({
      entry: config.tsFilesPath + config.tsEntryFileName,
      output: {
        filename: config.jsMainFileName,
      },
      resolve: {
        modulesDirectories: ['node_modules'],
        root: config.projectFilesRoot,
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
      },
      module: {
        preLoaders: [
          { test: /\.ts$/, loader: 'tslint' },
        ],
        loaders: [
          { test: /\.html$/, loaders: ["raw"] },
          { test: /\.scss$/, loaders: ["raw", "sass", 'autoprefixer?{browsers:["> 0%"]}'] },
          { test: /\.ts$/, loader: 'ts' },
        ],
      },
      sassLoader: {
        outputStyle: 'compressed'
      },
      tslint: {
        emitErrors: true,
        failOnHint: true,
      }
    })
    .pipe(gulp.dest(config.jsFilesPath));
});

// js closure compiler
gulp.task('min', function() {
  // js minify
  gulp.src(config.jsFilesPath + config.jsMainFileName)
    .pipe(gulpCC(
      {
        fileName: config.jsMainFileName
      },
      {
        language_in: 'ECMASCRIPT5_STRICT',
        language_out: 'ECMASCRIPT5'
      }))
    .pipe(gulp.dest(config.jsFilesPath))
  // css minify
  gulp.src(config.cssFilesPath + config.cssMainFileName)
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest(config.cssFilesPath));
});

gulp.task('default', [/*'webpack', */'sass', 'watch'], function() {

  browserSync.use(htmlInjector, {
    files: config.browserSyncInjectHtmlFiles
  });
  browserSync({
    open: false,
    // reloadOnRestart: true,
    proxy: {
      target: config.siteUrl,
      // ws: true
    },
    port: config.port,
    files: config.browserSyncWatchFiles,
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    notify: false,
    ghost: false,
    reloadDelay: 0
  });

});

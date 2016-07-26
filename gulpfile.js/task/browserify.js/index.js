'use strict';
/* ========================================================================== *
 * browserify.js
 *
 * @summary Browserify Gulp Task
 *
 * @copyright FrankyMartz, 2016
 * All rights reserved.
 * ========================================================================== */

/* Module =================================================================== */

var path = require('path');
var gulp = require('gulp');
var gUtil = require('gulp-util');
var gNotify = require('gulp-notify');
var gRev = require('gulp-rev');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var glob = require('glob');
var es = require('event-stream');

var watchify = require('watchify');
var gEslint = require('gulp-eslint');
var gUglify = require('gulp-uglify');
var collapse = require('bundle-collapser/plugin');
var debowerify = require('debowerify');

var noop = gUtil.noop;
var helper = require('./helper.js');
var resetVinyl = helper.resetVinyl;
var forIn = require('lodash/forIn');
var isArray = require('lodash/isArray');


/* Environment ============================================================== */

var IS_DEV = Boolean(global.env === 'dev');

var CONFIG = require('../../config.json');
var SRC_BASE = path.join(process.cwd(), CONFIG.root.src);
var DEST = path.join(CONFIG.root.dest);

// Gulp-Rev Requires Absolute URLs
var MANIFEST_BASE = path.join(process.cwd(), CONFIG.root.dest);
var MANIFEST = path.join(MANIFEST_BASE, CONFIG.root.manifest);


/* Browserify =============================================================== */

function compile(entry) {
  var b = browserify({
    entries: entry,
    debug: IS_DEV,
    cache: {},
    packageCache: {},
    fullPaths: IS_DEV,
  });

  function lint(){
    return gulp.src(entry)
      .pipe(gEslint())
      .pipe(gEslint.format());
  }


  function bundle(){
    // Collect All Internal (vendor.js) Module
    var vendorEntry = path.join(CONFIG.root.src, CONFIG.js.common);
    var allExternalUrl = helper.getAllExternalUrl(vendorEntry);
    // Insert Reference all (vendor.js) Module Reference
    forIn(allExternalUrl, function(value){
      b.external(value);
    });

    b.transform(debowerify, { preferNPM:true });

    var lintStream = lint();

    // CUSTOMIZE FILE TRANSFORM HERE -------------------------------------------
    var bundleStream = b.bundle()
      .on('error', gNotify.onError({
        title:'Browserify Compile Error',
        message:'<%= error.message %>\n<%= error.stack %>',
      }))
      .pipe(source(path.basename(entry)))
      .pipe(resetVinyl({
        base: SRC_BASE,
        origin: entry,
      }))
      .pipe(buffer())
      .pipe(IS_DEV ? noop() : gUglify(CONFIG.js.uglify))
      .on('error', gNotify.onError({
        title:'Browserify Uglify Error',
        message:'<%= error.message %>\n<%= error.stack %>',
      }))
      .pipe(IS_DEV ? noop() : gRev())
      .pipe(gulp.dest(DEST))
      .pipe(IS_DEV ? noop() : gRev.manifest(MANIFEST, {
        base: MANIFEST_BASE,
        merge:true,
      }))
      .pipe(IS_DEV ? noop() : gulp.dest(CONFIG.root.dest));

    // Return LintStream & BundleStream as single Stream
    return es.merge([
      lintStream,
      bundleStream,
    ]);
  }

  if (IS_DEV) {
    b.plugin(watchify);
    b.on('update', function(){
      bundle();
    });
  } else {
    b.plugin(collapse);
  }
  return bundle();

}


/* GulpJS =================================================================== */

gulp.task('browserify', ['browserify:common'], function(cb){
  // Construct Browserify SRC Array
  var allSrc = isArray(CONFIG.js.src) ? CONFIG.js.src : Array(CONFIG.js.src);
  var allTask = [];
  allSrc = allSrc.forEach(function(src){
    var blob = path.join(CONFIG.root.src, src, '*.js');
    // Browserify All SRC and Merge into Single Stream
    glob(blob, function(err, allFile){
      if (err) {
        cb();
      }
      var blobAllTask = allFile.map(compile);
      allTask = allTask.concat(blobAllTask);
    });
  });
  es.merge(allTask);
  cb();
});


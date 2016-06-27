'use strict';
/* ========================================================================== *
 * browserify.js/bundleCommon.js
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
var gUglify = require('gulp-uglify');
var collapse = require('bundle-collapser/plugin');

var noop = gUtil.noop;
var helper = require('./helper.js');
var resetVinyl = helper.resetVinyl;
var forIn = require('lodash/forIn');


/* Environment ============================================================== */

var CONFIG = require('../../config.json');
var IS_DEV = Boolean(global.env === 'dev');
var SRC = path.join(CONFIG.root.src, CONFIG.js.common);
var DEST = path.join(CONFIG.root.dest);

// Construct Common Bundle Filename
var EXT = path.extname(CONFIG.js.common);
var BASENAME = path.basename(CONFIG.js.common, EXT) + '.js';

// Reset Vinyl Paths
// Browserify doesn't maintain Vinyl Path
var SRC_BASE = path.join(process.cwd(), CONFIG.root.src);
var ORIGIN = path.join(
  CONFIG.root.src,
  path.dirname(CONFIG.js.common),
  BASENAME
);

// gulp-rev requires absolute URLs
var MANIFEST_BASE = path.join(process.cwd(), CONFIG.root.dest);
var MANIFEST = path.join(MANIFEST_BASE, CONFIG.root.manifest);


/* GulpJS =================================================================== */

gulp.task('browserify:common', function(){

  function bundle(){
    // Create Browserify Bundle
    var b = browserify({
      debug: IS_DEV,
      cache: {},
      packageCache: {},
    });

    // Include all specified vendor Libraries
    var allEntry = helper.getAllPackageUrl(SRC);
    forIn(allEntry, function(value, key){
      b.require(value, {expose: key});
    });

    if (!IS_DEV) {
      // Minify CommonJS paths
      b.plugin(collapse);
    }

    // Build common.js
    return b.bundle()
      .on('error', gNotify.onError({
        title:'Browserify Compile Error: Common',
        message:'<%= error.message %>\n<%= error.stack %>',
      }))
      .pipe(source(BASENAME))
      .pipe(resetVinyl({
        base: SRC_BASE,
        origin: ORIGIN,
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
  }

  if (IS_DEV) {
    gulp.watch(SRC, bundle);
  }

  return bundle();
});


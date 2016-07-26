'use strict';
/* ========================================================================== *
 * image.js
 *
 * @summary Image Gulp Task
 *
 * @license MIT
 * @copyright FrankyMartz, 2016
 * All rights reserved.
 * ========================================================================== */

/* Import =================================================================== */

var path = require('path');
var gulp = require('gulp');
var gUtil = require('gulp-util');
var gChange = require('gulp-changed');
var gRev = require('gulp-rev');
var buffer = require('vinyl-buffer');
var noop = gUtil.noop;
var gImageMin = require('gulp-imagemin');


/* Environment ============================================================== */

var CONFIG = require('../config.json');
var IS_DEV = Boolean(global.env === 'dev');

var SRC_BASE = path.join(process.cwd(), CONFIG.root.src);
var SRC = path.join(CONFIG.root.src, CONFIG.image.src, '**/*.{' + CONFIG.image.extension + '}');
var DEST = path.join(CONFIG.root.dest);

// Gulp-Rev requires Absolute URLs
var MANIFEST_BASE = path.join(process.cwd(), CONFIG.root.dest);
var MANIFEST = path.join(MANIFEST_BASE, CONFIG.root.manifest);


/* GulpJS =================================================================== */

gulp.task('image', function(){
  gulp.src(SRC, { base: SRC_BASE })
    .pipe(gChange(DEST))
    .pipe(IS_DEV ? noop() : gImageMin(CONFIG.image.imagemin))
    .pipe(IS_DEV ? noop() : buffer())
    .pipe(IS_DEV ? noop() : gRev())
    .pipe(gulp.dest(DEST))
    .pipe(IS_DEV ? noop() : gRev.manifest(MANIFEST, {
      base: MANIFEST_BASE,
      merge: true,
    }))
    .pipe(IS_DEV ? noop() : gulp.dest(CONFIG.root.dest));
});


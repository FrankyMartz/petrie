'use strict';
/* ========================================================================== *
 * sass.js
 *
 * @summary SASS Gulp Task
 *
 * @copyright FrankyMartz, 2016
 * All rights reserved.
 * ========================================================================== */

/* Import =================================================================== */

var path = require('path');
var gulp = require('gulp');
var gUtil = require('gulp-util');
var gNotify = require('gulp-notify');
var gChange = require('gulp-changed');
var buffer = require('vinyl-buffer');
var gRev = require('gulp-rev');

var gSass = require('gulp-sass');
var gAutoprefixer = require('gulp-autoprefixer');
var gCSSO = require('gulp-csso');
var noop = gUtil.noop;

/* Environment ============================================================== */

var CONFIG = require('../config.json');
var IS_DEV = Boolean(global.env === 'dev');

var SRC_BASE = path.join(process.cwd(), CONFIG.root.src);
var SRC = path.join(CONFIG.root.src, CONFIG.css.src, '*.{' + CONFIG.css.extension + '}');
var DEST = path.join(CONFIG.root.dest);

// Gulp-Rev Requires Absolute URLs
var MANIFEST_BASE = path.join(process.cwd(), CONFIG.root.dest);
var MANIFEST = path.join(MANIFEST_BASE, CONFIG.root.manifest);


/* GulpJS =================================================================== */

gulp.task('sass', function(){
  return gulp.src(SRC, { base: SRC_BASE })
    .pipe(gChange(DEST))
    .pipe(gSass(CONFIG.css.sass))
    .on('error', gNotify.onError({
      title: 'SASS Compile Error',
      message: '<%= error.message %>',
    }))
    .pipe(gAutoprefixer(CONFIG.css.autoprefixer))
    .on('error', gNotify.onError({
      title: 'Autoprefixer Compile Error',
      message: '<%= error.message %>',
    }))
    .pipe(IS_DEV ? noop() : gCSSO(CONFIG.css.csso))
    .pipe(IS_DEV ? noop() : buffer())
    .pipe(IS_DEV ? noop() : gRev())
    .pipe(gulp.dest(DEST))
    .pipe(IS_DEV ? noop() : gRev.manifest(MANIFEST, {
      base: MANIFEST_BASE,
      merge: true,
    }))
    .pipe(IS_DEV ? noop() : gulp.dest(CONFIG.root.dest));
});

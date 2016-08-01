/* ========================================================================== *
 * sass.js
 *
 * @summary SASS Gulp Task
 *
 * @copyright FrankyMartz, 2016
 * All rights reserved.
 * ========================================================================== */

/* Import =================================================================== */

import path from 'path';
import gulp from 'gulp';
import { noop } from 'gulp-util';
import gNotify from 'gulp-notify';
import gChange from 'gulp-changed';
import buffer from 'vinyl-buffer';

import gSass from 'gulp-sass';
import gAutoprefixer from 'gulp-autoprefixer';
import gCSSO from 'gulp-csso';

var gRev = require('gulp-rev');


import CONFIG from '../config.json';

/* Environment ============================================================== */

const IS_DEV = Boolean(global.env === 'dev');

const SRC_BASE = path.join(
  process.cwd(),
  CONFIG.root.src
);

const SRC = path.join(
  CONFIG.root.src,
  CONFIG.css.src,
  `*.\{${ CONFIG.css.extension }\}`
);

const DEST = path.join(
  CONFIG.root.dest
);


// gulp-rev requires absolute URLs
var MANIFEST_BASE = path.join(process.cwd(), CONFIG.root.dest);
var MANIFEST = path.join(MANIFEST_BASE, CONFIG.root.manifest);


/* GulpJS =================================================================== */

gulp.task('sass', function(){

  return gulp.src(SRC, {base:SRC_BASE})
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
      merge:true,
    }))
    .pipe(IS_DEV ? noop() : gulp.dest(CONFIG.root.dest));
});


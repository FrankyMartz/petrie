'use strict';
/* ========================================================================== *
 * font.js
 *
 * @summary Font Gulp Task
 *
 * @license MIT
 * @copyright FrankyMartz, 2016
 * All rights reserved.
 * ========================================================================== */

/* Import =================================================================== */

var path = require('path');
var gulp = require('gulp');
var gChange = require('gulp-changed');


/* Environment ============================================================== */

var CONFIG = require('../config.json');
var SRC = path.join(CONFIG.root.src, CONFIG.font.src, '**/*.{' + CONFIG.font.extension + '}');
var DEST = path.join(CONFIG.root.dest, CONFIG.font.dest);


/* GulpJS =================================================================== */

gulp.task('font',function(){
  return gulp.src(SRC)
    .pipe(gChange(DEST))
    .pipe(gulp.dest(DEST));
});


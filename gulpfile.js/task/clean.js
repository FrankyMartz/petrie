'use strict';
/* ========================================================================== *
 * clean.js
 *
 * @summary Clean Gulp Compile Output Directory
 *
 * @copyright FrankyMartz, 2016
 * All rights reserved.
 * ========================================================================== */

/* Import =================================================================== */

var path = require('path');
var gulp = require('gulp');
var del = require('del');


/* Environment ============================================================== */

var CONFIG = require('../config.json');


/* GulpJS =================================================================== */

gulp.task('clean', function(cb){
  del([
    // Manifest
    path.join(CONFIG.root.dest, CONFIG.root.manifest),
    // JS
    path.join(CONFIG.root.dest, CONFIG.js.dest),
    // SASS
    path.join(CONFIG.root.dest, CONFIG.css.dest),
    // IMAGE
    path.join(CONFIG.root.dest, CONFIG.image.dest),
    // FONT
    path.join(CONFIG.root.dest, CONFIG.font.dest),
  ]).then(function(){
    cb();
  });
});

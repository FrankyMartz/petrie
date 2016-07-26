'use strict';
/* ========================================================================== *
 * browsersync.js
 *
 * @summary BrowserSync Gulp Task
 *
 * @license MIT
 * @copyright FrankyMartz, 2016
 * All rights reserved.
 * ========================================================================== */

/* Import =================================================================== */

var gulp = require('gulp');
var bsServer = require('browser-sync').create();


/* Environment ============================================================== */

var CONFIG = require('../config.json');
var browserSyncConfig = CONFIG.server;


/* GulpJS =================================================================== */

gulp.task('browsersync', function(){
  bsServer.init(browserSyncConfig);
});


/* Module =================================================================== */

module.exports = bsServer;


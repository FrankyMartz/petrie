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
var SERVER_NAME = require('../../package.json').name;


/* GulpJS =================================================================== */

gulp.task('browsersync', function(){
  bsServer.init({
    notify: false,
    browser: 'google chrome',
    logPrefix: SERVER_NAME,
    open: false,
    port: CONFIG.server.port,
    proxy: CONFIG.server.proxy,
  });
});


/* Module =================================================================== */

module.exports = bsServer;

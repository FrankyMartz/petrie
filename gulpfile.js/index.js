'use strict';
/* ========================================================================== *
 * gulpfile.js
 *
 * @name petrie
 * @summary Basic GulpJS, HTML, SASS, Browserify, ES5
 *
 * @example
 * // Development: Make Magical Things && Watch
 * $ gulp
 * or
 * $ gulp --env=dev
 *
 * // Production: Clean Up && Compress
 * $ gulp --env=prod
 *
 * // Stage: Clean Up && Compress
 * $ gulp --env=stage
 *
 * @license MIT
 * @copyright FrankyMartz, 2016
 * All rights reserved.
 * ========================================================================== */

/* Import =================================================================== */

var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var requireDir = require('require-dir');
var argv = require('yargs').argv;


/* Global =================================================================== */

global.env = argv.env || 'dev';


/* Environment ============================================================== */

var ENV = global.env;

// Create All Environment Variable Here!
// process.env.<variable> = 'foobar';
/*
switch (ENV) {
  case 'prod':
    break;

  case 'stage':
    break;

  default:
}
 */

/* GulpJS =================================================================== */

// Load All Tasks to Run Gulp

requireDir('./task', {recurse: true});


// Task: Default ---------------------------------------------------------------
// (rev-manifest.json) cannot be created with any task in parellel
// (gulp-rev) Plugin Deficiency
// !!! Server destination builds need to be run in sequence !!!

gulp.task('default', function(cb){

  switch (ENV) {
  case 'prod':
    runSequence(
      'clean',
      'sass',
      'browserify',
      'image',
      'font',
      cb
    );
    break;

  case 'stage':
    runSequence(
      'clean',
      'sass',
      'browserify',
      'image',
      'font',
      cb
    );
    break;

  default:
    runSequence(
      'clean',
      ['sass', 'browserify', 'image', 'font'],
      'browsersync',
      'watch',
      cb
    );
  }
});

'use strict';
/* ========================================================================== *
 * watch.js
 *
 * @summary Watch Gulp Task
 *
 * @copyright FrankyMartz, 2016
 * All rights reserved.
 * ========================================================================== */

/* Module =================================================================== */

var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var gWatch = require('gulp-watch');
var gBatch = require('gulp-batch');
var bsServer = require('./browsersync.js');


/* Environment ============================================================== */

var CONFIG = require('../config.json');


/* GulpJS =================================================================== */

gulp.task('watch', function(){

  var SRC = {
    js: path.join(CONFIG.root.dest, CONFIG.js.dest, '**/*.js'),
    sass: path.join(CONFIG.root.src, CONFIG.css.src, '*.{' + CONFIG.css.extension + '}'),
    template: path.join(CONFIG.root.src, CONFIG.html.src, '**/*.{' + CONFIG.html.extension + '}'),
    font: path.join(CONFIG.root.src, CONFIG.font.src, '**/*.{' + CONFIG.font.extension + '}'),
    image: path.join(CONFIG.root.src, CONFIG.image.src, '**/*.{' + CONFIG.image.extension + '}'),
  };


  /* JavaScript ------------------------------------------------------------- */

  gWatch(
    SRC.js,
    gBatch(function(allEvent, cb){
      bsServer.reload();
      cb();
    })
  );


  /* SASS ------------------------------------------------------------------- */

  gWatch(
    SRC.sass,
    gBatch(function(allEvent, cb){
      runSequence('sass', function(){
        bsServer.reload();
        cb();
      });
    })
  );


  /* FONT ------------------------------------------------------------------- */

  gWatch(
    SRC.font,
    gBatch(function(allEvent, cb){
      runSequence('font', function(){
        bsServer.reload();
        cb();
      });
    })
  );


  /* IMAGE ------------------------------------------------------------------ */

  gWatch(
    SRC.image,
    gBatch(function(allEvent, cb){
      runSequence('image', function(){
        bsServer.reload();
        cb();
      });
    })
  );


  /* TEMPLATE --------------------------------------------------------------- */

  gWatch(
    SRC.template,
    gBatch(function(allEvent, cb){
      bsServer.reload();
      cb();
    })
  );

});


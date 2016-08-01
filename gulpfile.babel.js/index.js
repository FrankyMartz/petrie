/* ========================================================================== *
 * Gulpfile
 *
 * @example
 * // Development: Make Magical Things && Watch
 * $ gulp
 *
 * // Production: Clean Up && Compress
 * $ gulp -p
 *
 * @copyright Franky Martinez, 2016
 * All rights reserved.
 * ========================================================================== */


/* Import =================================================================== */

import gulp from 'gulp';
import requireDir from 'require-dir';
import { argv } from 'yargs';


/* Global =================================================================== */

const ENV = global.env = argv.env || 'dev';
let allGulpTask = [];


/* Environment ============================================================== */

// Create All Environment Variable Here!
// process.env.<variable> = 'foobar';


switch (ENV) {
  case 'prod':
    allGulpTask = [
    ];
    break;

  case 'stage':
    allGulpTask = [
    ];
    break;

  default:
    allGulpTask = [
    ];
}


/* GulpJS =================================================================== */

// Load All Tasks to Run Gulp

requireDir('./task', {recurse: true});


// Task: Default ---------------------------------------------------------------

gulp.task('default', allGulpTask);



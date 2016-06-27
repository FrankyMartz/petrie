'use strict';
/* ========================================================================== *
 * browserify.js/helper.js
 *
 * @summary Browserify Helper Module
 *
 * @copyright FrankyMartz, 2016
 * All rights reserved.
 * ========================================================================== */
/* Import =================================================================== */

var path = require('path');
var gUtil = require('gulp-util');
var bowerResolve = require('bower-resolve');
var npmResolve = require('resolve');
var es = require('event-stream');

var isString = require('lodash/isString');
var isArray = require('lodash/isArray');
var assign = require('lodash/assign');

/* Function ================================================================= */

/**
 * getAllPackageUrl
 *
 * Resolve all paths in JSON file or Single Export Module to Dictionary
 *
 * @param {Array.String} allPackageUrl - List of Modules to Path Resolve
 * @returns {Object} Dictionary of all vendor library included {<libName>:<url>}
 */
function getAllPackageUrl(allPackageUrl){
  if (!allPackageUrl || !isString(allPackageUrl)) {
    return;
  }
  var normalizeURL = path.resolve(__dirname, '../../../', allPackageUrl);
  var vendorList = require(normalizeURL);
  var allVendorPackage = {};
  vendorList.forEach(function(id){
    var url;
    try {
      url = npmResolve.sync(id);
    } catch (err) {
      try {
        url = bowerResolve.fastReadSync(id);
      } catch (e) {
        gUtil.log('Browserify Resolve Error:', id, url, e);
      }
    }
    if (url) {
      allVendorPackage[id] = url;
    }
  });
  return allVendorPackage;
}


/**
 * getAllExternalUrl
 *
 * Resolve all paths for All Common Bundles
 *
 * @param {Array} allEntry - Dictionary of all External Packages
 * @return {Object} Dictionary of Resolved Paths for all Common Bundles
 */
function getAllExternalUrl(allEntry){
  var result = {};
  allEntry = isArray(allEntry) ? allEntry : [allEntry];
  allEntry.forEach(function(entry){
    assign(result, getAllPackageUrl(entry));
  });
  return result;
}


/**
 *  resetVinyl
 *
 * @param {Object} opts - Vinyl File Path Configuration
 * @returns {Vinyl Stream} Vinyl File Event Stream
 */
function resetVinyl(opts){
  return es.map(function(file, callback){
    if (opts) {
      file.cwd = opts.cwd || process.cwd();
      file.base = opts.base || file.base;
      file.path = opts.path || path.join(file.cwd, opts.origin);
    }
    callback(null, file);
  });
}


/* Module =================================================================== */

exports.getAllPackageUrl = getAllPackageUrl;
exports.getAllExternalUrl = getAllExternalUrl;
exports.resetVinyl = resetVinyl;


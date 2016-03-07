var config = require('../config');

if(!config.tasks.clean) return;

var gulp = require('gulp'),
    rimraf = require('rimraf');

var cleanFunc = function(cb) {
    rimraf(config.tasks.clean, cb);
};

gulp.task('clean', cleanFunc);
module.exports = cleanFunc;
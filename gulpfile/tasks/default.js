var config = require('../config');

if(!config.tasks) return;

var gulp = require('gulp');

var defaultFunc = ['build', 'webserver', 'watch'];

gulp.task('default', defaultFunc);
module.exports = defaultFunc;
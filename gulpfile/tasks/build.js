var config = require('../config');

if(!config.tasks) return;

var gulp = require('gulp');

var buildFunc = [
    'html:build',
    'js:build',
    'sass:build',
    'fonts:build',
    'image:build'
];

gulp.task('build', buildFunc);
module.exports = buildFunc;
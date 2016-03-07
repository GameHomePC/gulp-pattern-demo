var config = require('../config');

if(!config.tasks.browserSync) return;

var gulp = require('gulp'),
    browserSync = require("browser-sync");

var webserverFunc = function() {
    browserSync(config.tasks.browserSync);
};

gulp.task('webserver', webserverFunc);
module.exports = webserverFunc;
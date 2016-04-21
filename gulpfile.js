"use strict";

const gulp = require("gulp");

gulp.task('default', function() {
    return gulp.src('stylus/**/*.{js,css}', {read: false})
        // {указываем через запятую} расширения файлов в скобках {}
        // src - использует {}, для указание файлов или путей к файлам
        // использовать массив потоков [arg, arg1 ...]
        // ! - пример !node_modules (игнорировать папку)
        // {read:false} - не хотим считывать файл
        // все это увеличивает производительность (НУЖНО ИСПОЛЬЗОВАТЬ)
        .on('data', function(file) {
            console.dir({
                contents: file.contents,
                path: file.path,
                cwd: file.cwd,
                base: file.base,

                // path component helpers
                relative: file.relative,
                dirname: file.dirname,
                basename: file.basename,
                stem: file.stem,
                extname: file.extname
            });
        })
        .pipe(gulp.dest(function(file) {
            return (file.extname == '.js') ? 'js' : (file.extname == '.styl') ? 'css' : 'dest'
        }));
});

// lessen 1,2,3

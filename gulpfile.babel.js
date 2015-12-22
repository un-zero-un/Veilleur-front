'use strict';

import gulp       from 'gulp';
import concat     from 'gulp-concat';
import browserify from 'browserify';
import babelify   from 'babelify';
import source     from 'vinyl-source-stream';
import template   from 'gulp-template';
import connect    from 'gulp-connect';

gulp.task('js', () => {
    return browserify({
        extensions: ['.js', '.jsx'],
        entries: ['node_modules/whatwg-fetch/fetch.js', 'src/jsx/app.jsx']
    })
        .transform(babelify.configure({
            ignore: /(bower_components)|(node_modules)/
        }))
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', () => {
    gulp.src('src/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
    gulp.src(['src/index.html'])
        .pipe(template(require('./config.json')))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['html', 'js', 'css']);

gulp.task('serve', () => {
    connect.server({
        port: 8000,
        root: 'dist',
        fallback: 'dist/index.html'
    });
});

gulp.task('watch', ['default', 'serve'], () => {
    gulp.watch('src/jsx/**/*', ['js']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch(['src/**.html', 'config.json'], ['html']);
});

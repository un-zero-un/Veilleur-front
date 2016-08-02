'use strict';

import gulp              from 'gulp';
import template          from 'gulp-template';
import connect           from 'gulp-connect';
import plumber           from 'gulp-plumber';
import webpack           from 'webpack-stream';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

gulp.task('js', () => {
    return gulp.src('src/jsx/app.js')
        .pipe(plumber())
        .pipe(webpack({
            module: {
                loaders: [
                    {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
                    {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")}
                ]
            },
            output: {filename: '[name].js'},
            plugins: [
                new ExtractTextPlugin("../css/[name].css")
            ]
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', () => {
    gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('html', () => {
    gulp.src(['src/index.html'])
        .pipe(template(require('./config.json')))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['html', 'js', 'images']);

gulp.task('serve', () => {
    connect.server({
        port: 8000,
        root: 'dist',
        fallback: 'dist/index.html'
    });
});

gulp.task('watch', ['default', 'serve'], () => {
    gulp.watch('src/images/*', ['images']);
    gulp.watch('src/jsx/**/*', ['js']);
    gulp.watch('src/scss/**/*.scss', ['js']);
    gulp.watch(['src/**.html', 'config.json'], ['html']);
});

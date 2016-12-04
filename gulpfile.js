const gulp = require('gulp'),
    path = require('path'),
    pug = require('gulp-pug'),
    less = require('gulp-less'),
    browserSync = require('browser-sync');

const SITE_DIR = '_site'
const LESS_DIR = 'less'
const CSS_DIR = '_site/css'

/**
 * pug compiler
 */

// compile .pug files
gulp.task('pug', function(){
    gulp.src('*.pug')
        .pipe(pug({
            prety: true
        }))
        .pipe(gulp.dest(SITE_DIR))
})

/**
 * less compiler
 */

// compile .less to destination directory
gulp.task('less', function(){
    return gulp.src(LESS_DIR + '/*.less')
        .pipe(less({
            includePaths: LESS_DIR,
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest(CSS_DIR))
        .pipe(browserSync.reload({stream: true}))
})

/**
 * browsersync watcher
 */

// recompile .pug back and live reload the browser
gulp.task('pug-rebuild', ['pug'], function(){
    browserSync.reload()
})

// wait pug and less tasks, then reload browser sync
gulp.task('browser-sync', ['less', 'pug'], function(){
    browserSync({
        server: {
            baseDir: SITE_DIR
        },
        notify: true
    })
})

// watch less for changes and recompile it
// watch .pug for canges and recompile it
// plus reload BrowserSync
gulp.task('watch', function(){
    gulp.watch(LESS_DIR + '/**', ['less'])
    gulp.watch(['*pug', '**/*.pug'], ['pug-rebuild'])
})

// default task
gulp.task('default', ['browser-sync', 'watch'])
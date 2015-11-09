'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var optimize = {
    on: true,
    js: function(file) {
        return optimize.on && optimize._is(file, 'js');
    },
    css: function(file) {
        return optimize.on && optimize._is(file, 'css');
    },
    _is: function(file, type) {
        var path = file.path,
            ext = path.substr(path.lastIndexOf('.') + 1);
        return ext === type;
    }
}

// Copy all files at the root level (app)
gulp.task('copy', function() {
    return gulp.src(['app/**/images/**/*', '.tmp/**/*.js'], {
            dot: true
        })
        .pipe(gulp.dest('dist'))
        .pipe($.size({
            title: 'copy'
        }));
});


// Compile and automatically prefix stylesheets
gulp.task('styles', function() {
    var AUTOPREFIXER_BROWSERS = ['ios >= 7', 'android >= 4.1'];
    return gulp.src(['app/styles/**/*.scss', '!app/**/partials/*.scss'])
        .pipe($.newer({
            dest: '.tmp/styles',
            ext: '.css'
        }))
        .pipe($.scssLint())
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.if(optimize.css, $.minifyCss()))
        .pipe($.if(optimize.on, $.sourcemaps.write('.')))
        .pipe($.if(optimize.on, gulp.dest('dist/styles')))
        .pipe($.size({
            title: 'styles'
        }));
});

//scripts
gulp.task("scripts", function() {
    return gulp.src(["app/**/*.jsx", "app/**/*.js"])
        .pipe($.newer({
            dest: '.tmp',
            ext: '.js'
        }))
        .pipe($.sourcemaps.init())
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError())
        .pipe($.babel())
        .on('error', console.error.bind(console))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(".tmp"))
        .pipe($.size({
            title: 'scripts'
        }));
});


// Scan your HTML for assets & optimize them
gulp.task('html', function() {
    var assets = $.useref.assets({
        searchPath: '.tmp'
    });
    return gulp.src('app/**/*.html')
        .pipe(assets)
        .pipe($.if(optimize.js, $.uglify()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml()))
        .pipe(gulp.dest('dist'))
        .pipe($.size({
            title: 'html'
        }));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {
    dot: true
}));

// Watch files for changes & reload
gulp.task('serve', function() {
    var options = {
        notify: false,
        logPrefix: 'RELOAD',
        server: ['.tmp', 'app']
    };

    runSequence('styles', ['scripts'], function() {
        browserSync(options);
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/styles/**/*.scss'], ['styles', reload]);
    gulp.watch(['app/**/*.jsx'], ['scripts', reload]);
    gulp.watch(['app/images/**/*'], reload);
});

gulp.task('build', ['clean'], function(cb) {
    optimize.on = true;
    runSequence('scripts', ['styles', 'html', 'copy'], cb);
});

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var optimize = {
    on: false,
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

// Scan your HTML for assets & optimize them
gulp.task('html', function() {
    return gulp.src(['app/**/*.html', '**.html'])
        .pipe($.minifyHtml())
        .pipe(gulp.dest('dist'))
        .pipe($.size({
            title: 'html'
        }));
});

// Copy all files at the root level (app)
gulp.task('copy', function() {
    return gulp.src(['app/**/images/**/*', '.tmp/**/*.js', 'app/**/*.css', 'app/**/fonts/**'], {
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
    return gulp.src(['app/styles/**/*.scss', '!app/**/partials/*.scss', '!app/**/mixins/*.scss'])
        .pipe($.scssLint())
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 5,
            errLogToConsole: true
        }))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.px2rem({
            rootValue: 75,
            unitPrecision: 4,
            propertyBlackList: [],
            propertyWhiteList: [],
            replace: true,
            mediaQuery: false,
            minPx: 1
        }, {}))
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
        .pipe($.if('*.jsx', $.babel()))
        .on('error', gutil.log)
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(".tmp"))
        .pipe($.size({
            title: 'scripts'
        }));
});

// Copy and Compressed images
gulp.task('images', function() {
    return gulp.src('app/images/**')
        .pipe($.cache($.imagemin({ //缓存图片,只处理修改过的,包括新增的
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true //类型：Boolean 默认：false 隔行扫描gif进行渲染
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size({
            title: 'images'
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
    runSequence('scripts', ['styles', 'html', 'copy', 'images'], cb);
});

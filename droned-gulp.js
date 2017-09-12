'use strict';

// Module dependencies
const gulp        = require('gulp'),
      browserSync = require('browser-sync'),
      reload      = browserSync.reload,
      nodemon     = require('gulp-nodemon'),
	  minify      = require('gulp-minify'),
	  minifyCSS   = require('gulp-clean-css'),
	  rename      = require('gulp-rename'),
	  babel       = require('gulp-babel');
// const cp = require('child_process');

/////////////////////
// - Browser-sync
/////////////////////
gulp.task('browser-sync', ['nodemon'], () =>  {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: ["public/**/*.js"],
        browser: "google chrome",
		port: 7000,
		online: true
	});
});

/////////////////////
// - Restart server
/////////////////////
gulp.task('nodemon', (cb) => {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', () => {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
    })
    .on('restart', () => {
        setTimeout(function() {
			reload({stream: false});
		}, 2000);
    })
});


////////////////////
// - BABEL / Minify
////////////////////
 
gulp.task('build_es6', () => {
	gulp.watch(['public/js/build/*.js'], () => {
		return gulp.src('public/js/build/*.js')
			.pipe(babel({
				presets: ['env']
			}))
			.pipe(minify({
				min: '.js'
			}))
			.pipe(gulp.dest('public/js/'))
	});
});

////////////////////
// - Minify-CSS
////////////////////
gulp.task('minify-css', () => {
	gulp.watch(['public/styles/build/*.css'], () => {
		return gulp.src('public/styles/build/*.css')
			.pipe(minifyCSS())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('public/styles'))
	})
});


// Reload browser on file save
gulp.task('default', ['browser-sync', 'build_es6', 'minify-css'], () => {
	gulp.watch(["**/*.html", "**/*.css", "**/*.js", "**/**/*.ejs", "*.json", "*.md"], () => {
		reload();
	});
});
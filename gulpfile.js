'use strict';

// Module dependencies
const gulp        = require('gulp'),
      browserSync = require('browser-sync'),
      reload      = browserSync.reload,
      nodemon     = require('gulp-nodemon'),
	  sass        = require('gulp-sass'),
	  sassGlob    = require('gulp-sass-glob'),
	  minifyCSS   = require('gulp-clean-css'),
	  minify      = require('gulp-minify'),
	  rename      = require('gulp-rename'),
	  concat      = require('gulp-concat'),
	  browserify  = require('gulp-browserify'),
	  babel       = require('gulp-babel');


/////////////////////
// - BrowserSync
/////////////////////
gulp.task('browser-sync', ['nodemon'], () =>  {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: ["public/**/*.js", "public/**/*.css", "views/**/*.ejs"],
        browser: "google chrome",
        port: 7000,
	});
});

// Restart server
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


/////////////////
// - SCSS/CSS
/////////////////
const SCSS_SRC  = 'build/scss/**/*.scss';
const SCSS_DEST = 'public/css';

gulp.task('build-scss', function() {
    return gulp.src(SCSS_SRC)
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(SCSS_DEST));
});

// Detect changes in SCSS
gulp.task('watch_scss', () => {
    gulp.watch(SCSS_SRC, ['build-scss']);
})


/////////////////
// - BABEL
/////////////////
const JS_SRC  = 'build/js/**/*.js';
const JS_DEST = 'public/js/' 
 
gulp.task('build_es6', () => {
	console.log('building js files');
	return gulp.src(JS_SRC)
		.pipe(babel({
			presets: ['env'],
			plugins: [
				['transform-runtime', {
					"helpers": false,
					"polyfill": true,
					"regenerator": true,
					"moduleName": "babel-runtime"
				}]
			]
		}))
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(rename({basename: 'all'}))
		.pipe(minify({
			ext: {
				src: '.min.js',
				min: '.js'
			}
		}))
		.pipe(gulp.dest(JS_DEST));
});

// Detect changes in JS
gulp.task('watch_es6', () => {
    gulp.watch(JS_SRC, ['build_es6']);
})



// - Reload browser on file save
gulp.task('default', ['browser-sync','build-scss', 'watch_scss', 'build_es6', 'watch_es6']);


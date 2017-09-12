'use strict';

// Module dependencies
const gulp        = require('gulp'),
      browserSync = require('browser-sync'),
      reload      = browserSync.reload,
      nodemon     = require('gulp-nodemon'),
	  sass        = require('gulp-sass'),
	  sassGlob    = require('gulp-sass-glob'),
	  minifyCSS   = require('gulp-clean-css'),
	  rename      = require('gulp-rename'),
	  concat      = require('gulp-concat'),
	  babel       = require('gulp-babel');

gulp.task('browser-sync', ['nodemon'], () =>  {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: ["public/**/*.js"],
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

const SCSS_SRC  = 'public/styles/scss/**/*.scss';
const SCSS_DEST = 'public/styles/css';

gulp.task('build-scss', function() {
    return gulp.src(SCSS_SRC)
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(SCSS_DEST))
});

// Detect changes in SCSS
gulp.task('watch_scss', () => {
    gulp.watch(SCSS_SRC, ['build-scss']);
})

/////////////////
// - BABEL
/////////////////

 
gulp.task('build_es6', () => {
	gulp.watch(['public/js/app.js'], () => {
		gulp.src('public/js/app.js')
        .pipe(babel({
            presets: ['env']
		}))
		.pipe(rename({suffix: '.build'}))
        .pipe(gulp.dest('public/js/build'))
	});
});



// - Reload browser on file save
gulp.task('default', ['browser-sync', 'watch_scss', 'build_es6'], () => {
	gulp.watch(["**/*.html", "**/*.css", "**/*.js", "**/**/*.ejs", "*.json", "*.md"], () => {
		reload();
	});
});


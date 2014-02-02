/* Gulpfile.js
 * Mike Erickson
 * codedungeon@gmail.com
 * Twitter: @codedungeon
 */

'use strict';

var gulp    = require('gulp'),
	jshint    = require('gulp-jshint'),
	concat    = require('gulp-concat'),
	rename    = require('gulp-rename'),
	uglify    = require('gulp-uglify'),
	less      = require('gulp-less'),
	path      = require('path'),
	minifyCSS = require('gulp-minify-css');

// compiles less files to single main.css then minifies to main.min.css
gulp.task('less', function(){
	return gulp.src('./dev/less/*.less')
	    .pipe(less({
	    	paths: [ path.join(__dirname, 'less', 'includes') ]
	    }))
		  .pipe(concat('main.min.css'))
		  .pipe(minifyCSS())
	    .pipe(gulp.dest('./dist/css'))
});

// lints all JS files in dev/js
gulp.task('lint', function(){
	return gulp.src('./dev/js/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'));
});

// concat js script files to app.js then minifies to app.min.js
gulp.task('scripts', function(){
	return gulp.src('./dev/js/*.js')
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest('./dist/js'))
	    .pipe(rename('app.min.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('./dist/js'));
});

// concat all css files to app.css then minifiles to app.min.css
gulp.task('css',function(){
  return gulp.src('./dev/css/*.css')
	    .pipe(concat('app.css'))
	    .pipe(minifyCSS())
	    .pipe(rename('app.min.css'))
	    .pipe(gulp.dest('./dist/css'))
});

// global watcher task to do all the magical stuff
gulp.task('watch',function(){
	gulp.watch('./dev/less/*.less',['less']);
	gulp.watch('./dev/js/*.js',['lint','scripts']);
	gulp.watch('./dev/css/*.css',['css']);
});

// gulp default task (runs all individual tasks, then kicks off the watcher task)
gulp.task('default', ['less', 'lint', 'scripts','css','watch']);

const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const del = require('del');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');

gulp.task('js', () => {
	return browserify('client/scripts/index.js', {debug:true})
		.transform('babelify', {
			sourceMaps: true,
			presets: ['es2015', 'react']
		})
		.bundle()
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('public/'))
});

gulp.task('compileSass', () => {
	return gulp.src(['client/styles/*.scss'])
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('public/'))
})

gulp.task('clean', () => {
	del(['public'])
});


gulp.task('default', ['clean', 'js', 'compileSass'], () => {
	gulp.watch(['client/**/*.js', 'client/**/*.scss'], ['js', 'compileSass'])
});
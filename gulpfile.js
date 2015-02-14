var gulp = require('gulp'),
	jasmine = require('gulp-jasmine');

gulp.task('default', function(){
	return gulp.src('specs.js')
		.pipe(jasmine());
});
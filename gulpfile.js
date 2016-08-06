const gulp = require('gulp')
const ts = require('gulp-typescript')


gulp.task('build', () => {
	return gulp
		.src([
			'**/*.ts',
			'!dest/**/*.ts',
			'!node_moduels/**/*.ts'
		])
		.pipe(ts({
			module                : "commonjs",
			target                : "es6",
			experimentalDecorators: true,
			isolatedModules       : true
		}))
		.pipe(gulp.dest('dest/'))
})

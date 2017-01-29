var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');


var gulpOptions = {
	// sassStyles: nested, expanded, compact, compressed
	style : 'compact',
	synchroClicks: false,
	synchroForms: false,
	synchroScroll: false
}

gulp.task('html', function() {
	gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});

gulp.task('fonts', function() {
	gulp.src('src/assets/fonts/*')
		.pipe(gulp.dest('dist/assets/fonts/'))
		.pipe(browserSync.stream());
});

gulp.task('sass', function() {
	return gulp.src('src/styles/**/*.scss')
		.pipe(sass({ outputStyle: gulpOptions.style }).on('error', sass.logError))
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
	gulp.watch('src/styles/**/*.scss', ['sass']);
});


gulp.task('babel', function() {
	return gulp.src("src/scripts/**/*.js")
		.pipe(babel())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});


gulp.task('serve', ['html', 'sass', 'babel', 'fonts'], function() {
	browserSync.init({
		online: true,
		open: "external",
		server: {
			baseDir: "dist/"
		},
		ghostMode: {
			clicks: gulpOptions.synchroClicks,
			forms: gulpOptions.synchroForms,
			scroll: gulpOptions.synchroScroll
		}
	});

	gulp.watch("src/**/*.html", ['html']);
	gulp.watch("src/styles/**/*.scss", ['sass']);
	gulp.watch("src/scripts/**/*.js", ['babel']);
	gulp.watch("src/assets/fonts", ['fonts']);
});


gulp.task('default', ['serve']);
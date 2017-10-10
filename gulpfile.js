const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass:test', function () {
    return gulp.src('./test/fixtures/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./test/fixtures/'));
});

gulp.task('sass:watch', function () {
    gulp.watch([
        './test/fixtures/**/*.scss',
        './*.scss'
    ], ['sass:test']);
});

// PLAYGROUND
gulp.task('sass:playground', function () {
    return gulp.src('./test/fixtures/-playground.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./test/fixtures/'));
});

gulp.task('playground', function () {
    gulp.watch([
        './test/fixtures/-playground.scss',
        './css-vars.scss'
    ], ['sass:playground']);
});
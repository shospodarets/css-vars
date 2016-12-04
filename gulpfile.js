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
    gulp.watch('./scss/**/*.scss', ['sass']);
});
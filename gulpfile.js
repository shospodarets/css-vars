const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass:test', () => {
    return gulp.src('./test/fixtures/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./test/fixtures/'));
});

gulp.task('sass:watch', () => {
    gulp.watch(
        [
            './test/fixtures/**/*.scss',
            './*.scss'
        ],
        gulp.series('sass:test')
    );
});

// PLAYGROUND
gulp.task('sass:playground', () => {
    return gulp.src('./test/fixtures/-playground.scss')
        .pipe(
            sass({
                outputStyle: 'expanded'
            }).on('error', sass.logError)
        )
        .pipe(gulp.dest('./test/fixtures/'));
});

gulp.task('playground', () => {
    gulp.watch(
        [
            './test/fixtures/-playground.scss',
            './css-vars.scss'
        ],
        gulp.series('sass:playground')
    );
});

gulp.task('default', gulp.series('sass:test', 'sass:watch'));
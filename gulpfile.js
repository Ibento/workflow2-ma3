var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less        = require('gulp-less');
var imagemin      = require('gulp-imagemin');
var path        = require('path');

gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("src/less/*.less", ['less']);
    gulp.watch("src/img/*", ['minImage']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('less', function () {
    return gulp.src('src/less/**/*.less')
    .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('minImage', () => {
    return gulp .src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("app/img/minified/"));

});
  
gulp.task('default', ['minImage','serve']);
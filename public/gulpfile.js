var gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  del = require('del');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});

gulp.task('html', function() {
  gulp.src('src/app/**/*.html') // 匹配 'public/src/app/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
    .pipe(gulp.dest('dist/app')); // 写入 'public/dist/app/somedir/somefile.js'
});

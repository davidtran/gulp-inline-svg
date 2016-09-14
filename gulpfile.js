var gulp = require('gulp');
var inlineSvg = require('./index.js');
var concat = require('gulp-concat');

gulp.task('default', function(done) {
  return gulp.src('./icons/*.svg')
    .pipe(inlineSvg({
      className: function(name) {
        return '.icon.' + name;
      }
    }))
    .pipe(concat('icons.css'))
    .pipe(gulp.dest('./dist'));
});

var gulp = require('gulp')
var inlineSvg = require('./index.js')

gulp.task('default', function(done) {
  return gulp.src('./icons/*.svg')
    .pipe(inlineSvg())
    .pipe(gulp.dest('./test.css'))
})
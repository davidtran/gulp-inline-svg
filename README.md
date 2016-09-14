# gulp-embed-svg-inline
Convert svg to base64 and embed image to css

## Install
```npm install --save-dev gulp-embed-svg-inline```

## Usage

```javascript
var gulp = require('gulp');
var inlineSvg = require('./index.js');
var concat = require('gulp-concat');

gulp.task('default', function(done) {
  return gulp.src('./icons/*.svg')
    .pipe(inlineSvg({
      className: function(name) {
        return '.icon. ' + name;
      }
    }))
    .pipe(concat('icons.css'))
    .pipe(gulp.dest('./dist'));
});
```

The above example generate icons.css. Include it to your project and start using svg icon like this:

```html
<div class='icon pattern_01'></div>
```

## Update class name
Define your own icon class name by using **className** options. You can use mask ```.icon .%s``` or a function.

Example using function:
```js
...
.pipe(inlineSvg({
  className: function(name) {
    let hover = name.indexOf('hover');
    if (hover !== -1) {
      return '.icon. ' + name.substr(0, hover) + ':hover';
    } else {
      return '.icon. ' + name;
    }

  }
}))
```
Example using mask string:
```js
...
.pipe(inlineSvg({
  className: '.icon .%s'
}))
```


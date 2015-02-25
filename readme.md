# gulp-safety-net

> Exception safe javascript wrapper

## Install

```
$ npm install --save-dev gulp-safety-net
```

## Usage

```js
var gulp      = require('gulp'),
    safetyNet = require('gulp-safety-net');

gulp.task('default', function () {
    return gulp.src('src/app.js')
        .pipe(safetyNet())
        .pipe(gulp.dest('dist'));
});
```

## API

### safetyNet([options])

#### options.setup
Type: `Function`
Default: `function () {}`

Allows a custom setup outside of the try/catch block.

```js
setup : function() { window.Logger = new Logger(); }
```

#### options.logger
Type: `String`
Default: `'console.log(e)'`

Provides an alternative logging call to pass the error to.

```js
logger: 'myCustomLogger(e)'
```

## License

MIT

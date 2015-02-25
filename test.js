'use strict';

var assert    = require('assert'),
    gutil     = require('gulp-util'),
    safetyNet = require('./');

describe('gulp-safety-net', function() {
    var contents = 'function test(){}';

    it('wraps the file contents in a try/catch block', function (cb) {
        var stream   = safetyNet();

        stream.on('data', function (file) {
            assert.equal(
                file.contents.toString(),
                '(function () {}()); try { ' + contents + ' } catch(e) { console.log(e); };'
            );
            cb();
        });

        stream.write(new gutil.File({
            contents: new Buffer(contents)
        }));
    });

    it("updates the logger to what's set in `logger`", function (cb) {
        var stream   = safetyNet({
            logger: 'console.warn("Error: ", e)'
        });

        stream.on('data', function (file) {
            assert.equal(
                file.contents.toString(),
                '(function () {}()); try { ' + contents + ' } catch(e) { console.warn("Error: ", e); };'
            );
            cb();
        });

        stream.write(new gutil.File({
            contents: new Buffer(contents)
        }));
    });

    it('includes the function set in `setup`', function (cb) {
        var stream   = safetyNet({
            setup: function () { window.Logger = function(error) { post(error); }; },
            logger: 'Logger(e)'
        });

        stream.on('data', function (file) {
            assert.equal(
                file.contents.toString(),
                '(function () { window.Logger = function(error) { post(error); }; }()); try { ' + contents + ' } catch(e) { Logger(e); };'
            );
            cb();
        });

        stream.write(new gutil.File({
            contents: new Buffer(contents)
        }));
    });
});

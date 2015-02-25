'use strict';

var extend  = require('extend'),
    gutil   = require('gulp-util'),
    through = require('through2');

module.exports = function (options) {
    var defaults = {
        logger: 'console.log(e)',
        setup: function () {}
    },
    settings = extend({}, defaults, options);

    function exceptionSafe (contents) {
        return new Buffer(
            '(' + settings.setup.toString() + '()); ' +
            'try { ' +
            contents.toString() +
            ' } catch(e) { ' +
            settings.logger + '; };'
        );
    }

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-safety-net', 'Streaming not supported'));
            return;
        }

        try {
            file.contents = exceptionSafe(file.contents);
            this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-safety-net', err, {fileName: file.path}));
        }

        cb();
    });
};

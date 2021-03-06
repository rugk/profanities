/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module profanities:script:build-data
 * @fileoverview Generate a database from source.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var fs = require('fs');
var path = require('path');
var json = require('JSONStream');
var join = require('join-stream');
var wrap = require('wrap-stream');

/*
 * Generate.
 */

fs
    .createReadStream(path.join('data', 'index.json'))
    .pipe(json.parse(function (value) {
        return '*   “' + value + '”';
    }))
    .pipe(join(';\n'))
    .pipe(wrap('# Support\n\n', '.\n'))
    .pipe(fs.createWriteStream(path.join('support.md')));

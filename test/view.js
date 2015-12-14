'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-meteor-horse:views', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/views'))
      .withOptions({
        collectionName: 'tests'
      })
      .on('end', done);
  });

  it('creates files', function() {
    assert.file([
      'app/client/views/tests/tests_add.html',
      'app/client/views/tests/tests_add.js',
      'app/client/views/tests/tests_edit.html',
      'app/client/views/tests/tests_edit.js',
      'app/client/views/tests/tests_index.html',
      'app/client/views/tests/tests_index.js',
      'app/client/views/tests/tests_show.html',
      'app/client/views/tests/tests_show.js'
    ]);
  });
});

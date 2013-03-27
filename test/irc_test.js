'use strict';

var grunt = require('grunt');
var gruntIrc = require('../tasks/lib/irc');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.irc = {
  setUp: function(done) {
    // setup here if necessary
    //sandbox = sinon.sandbox.create();
    done();
  },
  default_options: function(test) {
    grunt.log.write('testing 123');

    test.expect(1);

    // yeah i know - testing..
    // think the problem is that this should be a file not the contents of the file....maybe?
    var wibble = new Array(grunt.file.read('test/fixtures/123'));

    console.log('\n***' + wibble + '\n');

    gruntIrc.init(grunt.package.irc, grunt, wibble);

    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    gruntIrc.init(grunt.package.irc, grunt, 'test/expected/testing');

    var actual = grunt.file.read('tmp/custom_options');
    var expected = grunt.file.read('test/expected/custom_options');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },

};

/*
 * grunt-irc
 * https://github.com/vikki/gruntirc
 *
 * Copyright (c) 2013 Vikki
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    irc: {
      deployed: {
        options: {
          text: 'Yay! Nous avons deployed :D'
        }
      },
      deploying: {
        options: {
          text: 'Deploying - cross your fingers!'
        }
      },
      options: {
          url : 'localhost', 
          botName : 'gruntbot',
          channel: ['#channel1' ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/irc_test.js'],
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      
      unit: { src: 'test/irc_test_mocha.js' },
      end2end: { src: 'test/irc_test_mocha_end2end.js' }
    },
    // end2end tests (set up a local irc server for full test)
    irc_test: {
        testArgs: 'simplemocha:end2end'
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-parallel');

  grunt.registerTask('nodeunit_test', ['clean', 'nodeunit']);
  grunt.registerTask('mocha_test', ['clean', 'simplemocha']);

  grunt.registerTask('test', ['clean', 'simplemocha']);

  grunt.registerTask('testIrcServer', function() {
    var timeout,
        server,
        done,
        testArgs;

    server = require('ircdjs/lib/server.js').Server;
    server.boot();

    testArgs = grunt.config.get('irc_test.testArgs') || 'test';
    done = this.async();

    grunt.util.spawn({grunt:true, args: 'simplemocha:end2end'}, function(error, result, code) {
      grunt.log.writeln(result.toString('ascii'));
      done(error == null);
    });
  });

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('end2end', ['testIrcServer']);

};

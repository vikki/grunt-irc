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
          botName : 'nombot',
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

      all: { src: 'test/irc_test_mocha.js' }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  //grunt.registerTask('test', ['clean', 'irc', 'nodeunit']);
  grunt.registerTask('nodeunit_test', ['clean', 'nodeunit']);
  grunt.registerTask('mocha_test', ['clean', 'simplemocha']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

/*
 * grunt-irc
 * https://github.com/vikki/gruntirc
 *
 * Copyright (c) 2013 Vikki
 * Licensed under the MIT license.
 */

'use strict';

var irc = require('../tasks/lib/irc.js');

module.exports = function(grunt) {

  grunt.registerMultiTask('irc', 'Announce stuff on IRC with grunt!', function() {
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    var done = this.async();

    this.requiresConfig('irc.options.url');
    this.requiresConfig('irc.options.botName');
    this.requiresConfig('irc.options.channel');

    irc.init(options, done, done);
    irc.start();
  });
};
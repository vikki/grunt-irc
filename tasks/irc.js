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

    this.requiresConfig('irc.options.url');
    this.requiresConfig('irc.options.botName');
    this.requiresConfig('irc.options.channel');

    //grunt.log.writeflags(options, 'options: ');

    //grunt.log.writeflags(grunt.config.get('irc.options'), 'kitteh: ');

    //grunt.log.writeln('** in task **');

    irc.init(options, grunt, this);
  });
};
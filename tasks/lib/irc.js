/*
 * grunt-irc
 * https://github.com/vikki/gruntirc
 *
 * Copyright (c) 2013 Vikki
 * Licensed under the MIT license.
 */

'use strict';

var irc = require('irc');

exports.init = function(options, grunt, task) {
  var done = task.async();

  var ircOptions = grunt.config.get('irc.options');
  //var url = grunt.config.get('irc.options.url'),
      //botName = grunt.config.get('irc.options.botName'),
      //channel = grunt.config.get('irc.options.channel');
  
  var bot = new irc.Client(ircOptions.url, ircOptions.botName, { debug: true, channels: ircOptions.channel });

  bot.addListener('join', function(channel, who) {
    bot.say(options.channel, options.text);
    grunt.log.writeln('done! i said ' + options.text);
    done();
  });

  bot.addListener('error', function(message) {
    grunt.log.writeln('ERROR: %s: %s', message.command, message.args.join(' '));
    done();
  });

};

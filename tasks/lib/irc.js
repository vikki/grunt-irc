/*
 * grunt-irc
 * https://github.com/vikki/gruntirc
 *
 * Copyright (c) 2013 Vikki
 * Licensed under the MIT license.
 */

'use strict';

var irc = require('irc');

// I think this needs to return an object rather than be on the module maybe

// should probs be an error and success cb
exports.init = function(options, success, error) {
  var self = this;

  this.bot = this.bot || new irc.Client( options.url, 
                                         options.botName, 
                                         { 
                                           debug: options.debug ? options.debug : false, 
                                           channels: options.channel, 
                                           autoConnect: false 
                                         });
  
  this.bot.addListener('join', function(channel, who) {
    self.bot.say(options.channel[0], options.text);
    if (typeof success === 'function'){
      success();
    }    
  });

  this.bot.addListener('error', function(message) {
    self.log('ERROR: %s: %s', message.command, message.args.join(' '));
    if (typeof error === 'function'){
      error(message);
    }
  });
};

// basically pulled this out so i can test it (mock the connection)
exports.start = function(grunt){
  this.bot.connect();
};


'use strict';

var grunt = require('grunt');
var gruntIrc = require('../tasks/lib/irc');
var sinon = require('sinon');

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
    this.sandbox = sinon.sandbox.create();
    done();
  },
  tearDown: function(done) {
    this.sandbox = sinon.sandbox.restore();
    done();
  },
  ensure_bot_says_configured_msg_on_join_channel: function(test) {
    test.expect(2);

    var options = {
          text: 'Yay! Nous avons deployed :D',
          url : 'irc.unrulymedia.com', 
          botName : 'nombot',
          channel: ['#cakeordeath' ]
    };

    gruntIrc.init(options);

    // stub out bot say and fake the join event
    var spy = sinon.spy();
    gruntIrc.bot.say = spy;
    gruntIrc.bot.emit('join');

    // call start - when not on train 3g :P
    // gruntIrc.start();
    
    // verify bot say call
    test.ok(spy.called, 'bot.say was not called');
    test.ok(spy.calledWithMatch(options.channel[0], options.text), 'bot.say was not called with the right args');

    test.done();
  }

};

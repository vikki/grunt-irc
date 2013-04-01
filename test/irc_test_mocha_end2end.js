/*global describe:true, it:false, beforeEach:false, afterEach:false */
'use strict';

var sinon     = require('sinon'),
    chai      = require('chai'),
    sinonChai = require('sinon-chai'),
    should    = chai.should(),
    expect    = chai.expect,
    gruntIrc  = require('../tasks/lib/irc');

chai.use(sinonChai);

describe('grunt IRC lib module ', function() {

  var options = {
          text: 'Yay! Nous avons deployed :D',
          url : 'localhost', 
          botName : 'gruntbot',
          channel: ['#cakeordeath']
        };

  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
  }); 

  afterEach(function() {
    this.sandbox = sinon.sandbox.restore();
  });

  it('should announce on real, correct IRC channel', function(done){
    var botSaySpy;

    // i kinda has a sad that it has to work this way but not sure how else to do the async in an end2end test
    // it does fail (timeout) if this doesn't get called too, in my defense :P
    var verifyCallback = function(worked) {
      botSaySpy.should.have.been.called;
      botSaySpy.should.have.been.calledWithMatch(options.channel[0], options.text);
      done(worked);
    };

    var success = verifyCallback.bind(true);
    var fail = verifyCallback.bind(false);

    gruntIrc.init(options, success, fail);

    // spy on bot.say
    botSaySpy = sinon.spy();
    gruntIrc.bot.say = botSaySpy;

    gruntIrc.start();
  });

});

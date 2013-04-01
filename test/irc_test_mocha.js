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
          url : 'irc.unrulymedia.com', 
          botName : 'nombot',
          channel: ['#cakeordeath' ]
        };

  beforeEach(function(done) {
    this.sandbox = sinon.sandbox.create();
    done();
  }); 

  afterEach(function(done) {
    this.sandbox = sinon.sandbox.restore();
    done();
  });

  it('should announce on correct IRC channel', function(){
    var dummyTaskAsync,
        botSaySpy;

    dummyTaskAsync = sinon.stub().returns(sinon.stub());
    gruntIrc.init(options, dummyTaskAsync, dummyTaskAsync);

    // stub out bot say and fake the join event
    botSaySpy = sinon.spy();
    gruntIrc.bot.say = botSaySpy;
    gruntIrc.bot.emit('join');

    // would be nice to stub this with an emit, dunno if you can??
    // could just overwrite the func but a stub would be clearer
    // gruntIrc.start();
    
    botSaySpy.should.have.been.called;
    botSaySpy.should.have.been.calledWithMatch(options.channel[0], options.text);
  });

  it('should connect to right IRC server', function(){
    gruntIrc.init(options);

    gruntIrc.bot.opt.server.should.equal(options.url);
    gruntIrc.bot.opt.nick.should.equal(options.botName);
  });

  it('should connect with right bot name', function(){
    gruntIrc.init(options);

    gruntIrc.bot.opt.nick.should.equal(options.botName);
  });

});

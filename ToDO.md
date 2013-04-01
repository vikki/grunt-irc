:) # Set up the required config - see https://github.com/gruntjs/grunt/wiki/grunt.config

# Avoid reconnecting on single run if that's in any way poss?
:) # unit Tests!
:) rewrite unit tests with mocha cos nodeunit sucks - and update grunt file and package.json accordingly
:) figure out how the fuck to do end2end tests - open freenode channel or something? - do with localhost irc server with ircdjs :DDD

:) add end2end tests
    :) can run server from gruntfile
    :) have to parallelise by starting IRC server, then running tests, then killing both
    :) grunt-parallel is badass, but don't really want parallel so much as nested (there's probs a proper word for this :P)
    # could add further e2e tests that did an actual grunt run if we learnt the ircdjs api and had verifies on the ircdjs callbacks for join or whatever, but manyana


# still need tests for :
# - missing config
# - multi channel broadcast

:) ensure that the connection dies!!
# add a readme
# whack it on github
# git checkin
# try it with leo + content widget
# get other people to try it :P
# Tag with gruntplugin
# potentially whack it in npm???
# ???
# Profit

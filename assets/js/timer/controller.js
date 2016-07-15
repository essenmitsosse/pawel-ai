define( [
	"helper/cache",
	"helper/globalSetter",
	"helper/errorMessenger",
	"timer/Timeout",
	"timer/list",
	"scroller/scroller",
	"menu/menuFactory"
], function ( _cache, globalSetter, errorMessenger, Timeout, timeoutList, scroller, menuFactory ) {

	var getGlobalPause = globalSetter.getGlobalGetter( "isPaused" ),
		setGlobalPause = globalSetter.getGlobalSetter( "isPaused" ),
		setGlobalScroll = globalSetter.getGlobalSetter( "allowScroll" ),
		isPlaying = false;

	function addTimeout( callback, delay, desc ) {
		if ( delay > 0 ) {
			return new Timeout( callback, delay, desc );
		} else {
			callback();
		}
	}

	function addTimeoutThatDoesntPause( callback, delay ) {
		return addTimeout( callback, delay, true );
	}

	function removeTimeout( timeout ) {
		if ( timeout instanceof Timeout ) {
			timeout.stop();
		}
	}

	function pauseAllTimeouts( isMenu ) {
		setGlobalPause( true );
		setGlobalScroll( !isMenu );
		timeoutList.pauseAllTimeouts();
		isPlaying = false;
		if ( isMenu ) {
			_cache.$body.addClass( "showMenu" );
		}
	}

	function resumeAllTimeoutsAfterScroll() {
		timeoutList.resumeAllTimeouts();
		isPlaying = true;
	}

	function resumeAllTimeouts( isMenu ) {
		setGlobalPause( false );
		setGlobalScroll( false );
		scroller.scrollToCurrentPosition( 500 );
		setTimeout( resumeAllTimeoutsAfterScroll, 700 );
		if ( !isMenu ) {
			menuFactory.hideAllMenuItems();
		}
		_cache.$body.removeClass( "showMenu" );
	}

	function stopAll() {
		timeoutList.stopAllTimeouts();
	}

	function toggleAllTimeouts() {
		if ( !getGlobalPause() ) {
			pauseAllTimeouts();
		} else {
			resumeAllTimeouts();
		}
	}

	return {
		addTimeout: addTimeout,
		addTimeoutThatDoesntPause: addTimeoutThatDoesntPause,
		removeTimeout: removeTimeout,
		toggleAllTimeouts: toggleAllTimeouts,
		pauseAllTimeouts: pauseAllTimeouts,
		resumeAllTimeouts: resumeAllTimeouts,
		stopAll: stopAll

	};
} );

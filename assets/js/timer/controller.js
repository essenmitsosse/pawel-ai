define( [
	"helper/globalSetter",
	"helper/errorMessenger",
	"timer/Timeout",
	"timer/list",
	"scroller/scroller"
	], function ( globalSetter, errorMessenger, Timeout, timeoutList, scroller ) {

	var getGlobalPause = globalSetter.getGlobalGetter( "isPaused" ),
		setGlobalPause = globalSetter.getGlobalSetter( "isPaused" ),
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

	function pauseAllTimeouts() {
		setGlobalPause( true );
		timeoutList.pauseAllTimeouts();
		isPlaying = false;
	}

	function resumeAllTimeoutsAfterScroll() {
		timeoutList.resumeAllTimeouts();
		isPlaying = true;
	}

	function resumeAllTimeouts() {
		setGlobalPause( false );
		scroller.scrollToCurrentPosition( 500 );
		setTimeout( resumeAllTimeoutsAfterScroll, 700 );
	}

	function stopAll() {
		timeoutList.stopAllTimeouts();
	}

	function toggleAllTimeouts() {
		if ( !getGlobalPause() ) {
			pauseAllTimeouts( true );
		} else {
			resumeAllTimeouts( true );
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

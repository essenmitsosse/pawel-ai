define( [ 
	"helper/globalSetter", 
	"helper/errorMessenger", 
	"timer/Timeout", 
	"timer/list",
	"scroller/scroller"
	], function ( globalSetter, errorMessenger, Timeout, timeoutList, scroller ) {
	
	var toggleGlobalPause = globalSetter.getGlobalToggler( "isPaused" );

	function addTimeout ( callback, delay ) {
		if ( delay > 0 ) {
			return new Timeout( callback, delay );
		} else {
			callback();
		}
	}

	function removeTimeout ( timeout ) {
		if ( timeout instanceof Timeout ) {
			timeout.stop();
		}
	}

	function pauseAllTimeouts () {
		if ( globalSetter.getGlobal( "isPaused" ) ) {
			timeoutList.pauseAllTimeouts();
			isPlaying = false;
		}
	}

	function resumeAllTimeouts () {
		if ( !globalSetter.getGlobal( "isPaused" ) ) {
			timeoutList.resumeAllTimeouts();
			isPlaying = true;
		}		
	}

	function toggleAllTimeouts () {
		var isPaused = toggleGlobalPause();

		if ( isPaused ) {
			pauseAllTimeouts();
		} else {
			scroller.scrollToCurrentPosition( 500 );
			setTimeout( resumeAllTimeouts, 700 );
		}
	}

	return {
		addTimeout: addTimeout,
		removeTimeout: removeTimeout,
		toggleAllTimeouts: toggleAllTimeouts

	};
} );
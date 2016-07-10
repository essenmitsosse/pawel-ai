define( [], function () {
	var timeoutList = [];

	function addToList( item ) {
		timeoutList.push( item );
	}

	function removeFromList( item ) {
		var pos = timeoutList.indexOf( item );
		timeoutList.splice( pos, 1 );
	}

	function pauseTimeout( timeout ) {
		timeout.pause();
	}

	function resumeTimeout( timeout ) {
		timeout.resume();
	}

	function pauseAllTimeouts() {
		timeoutList.forEach( pauseTimeout );
	}

	function resumeAllTimeouts() {
		timeoutList.forEach( resumeTimeout );
	}

	function stopAllTimeouts() {
		var i = timeoutList.length;
		while ( i > 0 ) {
			i -= 1;
			timeoutList[ i ].stop();
		}

	}

	return {
		addToList: addToList,
		removeFromList: removeFromList,
		pauseAllTimeouts: pauseAllTimeouts,
		resumeAllTimeouts: resumeAllTimeouts,
		stopAllTimeouts: stopAllTimeouts
	};
} );

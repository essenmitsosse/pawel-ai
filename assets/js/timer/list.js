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

	function stopTimeout( timeout ) {
		timeout.stop();
	}

	function pauseAllTimeouts() {
		timeoutList.forEach( pauseTimeout );
	}

	function resumeAllTimeouts() {
		timeoutList.forEach( resumeTimeout );
	}

	function stopAllTimeouts() {
		timeoutList.forEach( stopTimeout );
	}
	return {
		addToList: addToList,
		removeFromList: removeFromList,
		pauseAllTimeouts: pauseAllTimeouts,
		resumeAllTimeouts: resumeAllTimeouts,
		stopAllTimeouts: stopAllTimeouts
	};
} );

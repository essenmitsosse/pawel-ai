define( [], function () {
	var timeoutList = [];

	function addToList ( item ) {
		timeoutList.push( item );
	}

	function removeFromList ( item ) {
		var pos = timeoutList.indexOf( item );
    	
    	if ( pos > 0 ) {
    		timeoutList = timeoutList.splice( pos, 1 );
    	}
	}

	function pauseTimeout ( timeout ) {
		timeout.pause();
	}

	function resumeTimeout ( timeout ) {
		timeout.resume();
	}
	
	function pauseAllTimeouts () {
		timeoutList.forEach( pauseTimeout );
	}
	
	function resumeAllTimeouts () {
		timeoutList.forEach( resumeTimeout );
	}

	return {
		addToList: addToList,
		removeFromList: removeFromList,
		pauseAllTimeouts: pauseAllTimeouts,
		resumeAllTimeouts: resumeAllTimeouts
	}
} );
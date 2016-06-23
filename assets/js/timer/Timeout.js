define( [ "timer/list" ], function ( timeoutList ) {
	function Timeout ( callback, delay ) {
		this.callback = callback;
		this.delay = Math.round( delay );
		this.creationTime = window.performance.now();

		timeoutList.addToList( this );

		this.setTimeout();
	}

	Timeout.prototype.setTimeout = function () {
		this.timeout = setTimeout( this.callback.bind( this ), this.delay );
	}

	Timeout.prototype.clearTimeout = function () {
		clearTimeout( this.timeout );
	}

	Timeout.prototype.stop = function () {
		timeoutList.removeFromList( this );
		this.clearTimeout();
	}

	Timeout.prototype.callback = function () {
		this.callback();
		this.stop();
	}

	Timeout.prototype.pause = function () {
		var timeSinceCreation = Math.round( window.performance.now() - this.creationTime );
		this.delay = this.delay - timeSinceCreation;

		this.clearTimeout();
	}

	Timeout.prototype.resume = function () {
		this.setTimeout();
	}

	return Timeout;
});
define( [ "timer/list" ], function ( timeoutList ) {
	var i = 0;

	function Timeout( callback, delay, noPause ) {
		this.callbackFunction = callback;
		this.delay = Math.round( delay );
		this.creationTime = window.performance.now();
		this.noPause = noPause || false;

		timeoutList.addToList( this );

		this.i = i;
		i += 1;

		this.setTimeout();

		if ( this.noPause ) {
			this.pause = this.pauseNot;
		}
	}

	Timeout.prototype.setTimeout = function () {
		this.timeout = setTimeout( this.callbackFunction.bind( this ), this.delay );
	};

	Timeout.prototype.clearTimeout = function () {
		clearTimeout( this.timeout );
	};

	Timeout.prototype.stop = function () {
		timeoutList.removeFromList( this );
		this.clearTimeout();
	};

	Timeout.prototype.callback = function () {
		this.callbackFunction();
		this.stop();
	};

	Timeout.prototype.pause = function () {
		var timeSinceCreation = Math.round( window.performance.now() - this.creationTime );
		this.delay = this.delay - timeSinceCreation;

		this.clearTimeout();
	};

	Timeout.prototype.pauseNot = function () {};

	Timeout.prototype.resume = function () {
		this.setTimeout();
	};

	return Timeout;
} );

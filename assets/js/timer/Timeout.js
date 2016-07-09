define( [ "helper/globals", "timer/list" ], function ( _globals, timeoutList ) {
	var i = 0;

	function Timeout( callback, delay, desc ) {
		this.callbackFunction = callback;
		this.delay = Math.round( delay );
		this.creationTime = window.performance.now();
		this.name = desc;

		timeoutList.addToList( this );

		this.i = i;
		i += 1;

		this.setTimeout();

		// if ( this.noPause ) {
		// 	this.pause = this.pauseNot;
		// }
	}

	Timeout.prototype.setTimeout = function () {
		var delay = this.delay / ( _globals.typeSpeedMultiplyer || 1 );
		this.timeout = setTimeout( this.callback.bind( this ), delay );
	};

	Timeout.prototype.clearTimeout = function () {
		clearTimeout( this.timeout );
	};

	Timeout.prototype.stop = function () {
		timeoutList.removeFromList( this );
		this.clearTimeout();
	};

	Timeout.prototype.callback = function () {
		this.stop();
		this.callbackFunction();
	};

	Timeout.prototype.pause = function () {
		console.log( "pause" );
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

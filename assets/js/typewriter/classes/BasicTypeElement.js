define( [
	"helper/errorMessenger",
	"timer/controller"
	], function ( errorMessenger, timerController ) {

	function BasicTypeElement() {}

	BasicTypeElement.prototype.name = "BasicTypeElement";
	BasicTypeElement.prototype.defaultDelay = 0;

	BasicTypeElement.prototype.addNext = function ( next ) {
		this.next = next;
	};

	BasicTypeElement.prototype.randomize = function ( input, minFactor, maxFactor ) {
		return input * ( minFactor + ( Math.random() * ( maxFactor - minFactor ) ) );
	};

	BasicTypeElement.prototype.basicSetup = function ( args ) {
		args = args || [];

		this.parent = args.parent;
		this.nr = args.nr;
		this.self = args.self;
		this.prev = args.prev || false;
		this.delay = args.delay || this.defaultDelay || false;

		if ( this.isElement === true ) {
			this.$self = $( this.self );
			this.delay = this.$self.data( "delay" ) || this.delay;
		}

		// add this as the next Element to the previous Element
		if ( this.prev !== false ) {
			this.prev.addNext( this );
		}

		// create childList if this object can have children
		if ( this.hasChildren === true && this.getChildren ) {
			this.getChildren();
			this.currentChild = 0;
		}

		this.reset();
	};

	BasicTypeElement.prototype.getDelay = function () {
		return this.delay;
	};

	BasicTypeElement.prototype.reset = function () {
		this.$self.removeClass( "s" )
			.removeClass( "done" )
			.addClass( "ns" );

		if ( this.resetChildren ) {
			this.resetChildren();
		}

		return this;
	};

	BasicTypeElement.prototype.startReveal = function ( parentCallback, delay ) {

		this.parentCallbackAfterReveal = parentCallback;

		this.$self.addClass( "s" )
			.removeClass( "ns" );

		delay = delay || this.getDelay() || 0;

		if ( this.scrollDelay ) {
			delay += this.scrollDelay;
		}

		if ( this.beforeRevealCountdown ) {
			this.beforeRevealCountdown();
		}

		if ( delay > 0 ) {
			console.log( delay );
			timerController.addTimeout( this.reveal.bind( this ), delay, "reveal next basic element" );
		} else {
			this.reveal();
		}
	};

	BasicTypeElement.prototype.afterReveal = function () {
		if ( this.afterDelay > 0 ) {
			timerController.addTimeout( this.finish.bind( this ), this.afterDelay, "finish current element" );
		} else {
			this.finish();
		}
	};

	BasicTypeElement.prototype.finish = function () {
		this.$self.addClass( "done" );
		if ( this.parentCallbackAfterReveal ) {
			this.parentCallbackAfterReveal();
		}
	};

	BasicTypeElement.prototype.reveal = function () {
		this.afterReveal();
	};

	BasicTypeElement.prototype.moveToStartFirst = function () {
		this.notRevealedYet = true;
	};

	return BasicTypeElement;
} );

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

		if ( this.specialReset ) {
			this.specialReset();
		}

		return this;
	};

	BasicTypeElement.prototype.startReveal = function ( parentCallback, delay ) {
		this.parentCallbackAfterReveal = parentCallback;

		this.$self.addClass( "s" )
			.removeClass( "ns" );

		// if this is the last element of its kind, add class "last"
		if ( !this.next ) {
			this.$self.addClass( "last" );
		}

		delay = delay || this.getDelay() || 0;

		if ( this.scrollDelay ) {
			delay += this.scrollDelay;
		}

		// do special stuff like scrolling
		if ( this.beforeRevealCountdown ) {
			this.beforeRevealCountdown();
		}

		timerController.addTimeout( this.reveal.bind( this ), delay, "reveal next basic element" );
	};

	BasicTypeElement.prototype.afterReveal = function () {
		timerController.addTimeout( this.finish.bind( this ), this.afterDelay, "finish current element" );
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

	BasicTypeElement.prototype.getMargin = function () {
		var i = 1;

		this.topMargin = 0;

		while ( i <= 15 ) {
			if ( this.$self.hasClass( "m" + i ) ) {
				this.topMargin = i;
				break;
			}
			i += 1;
		}

		i = 0;

		while ( i <= 15 ) {
			if ( this.$self.hasClass( "h" + i ) ) {
				this.topMargin += i;
				break;
			}
			i += 1;
		}
	};

	return BasicTypeElement;
} );

define( [ 
	"helper/globals",
	"helper/errorMessenger",
	"timer/controller" 
	], function ( _globals, errorMessenger, timerController ) {

	function BasicTypeElement () {};

	BasicTypeElement.prototype.name = "BasicTypeElement";
	BasicTypeElement.prototype.defaultDelay = 0;

	BasicTypeElement.prototype.addNext = function ( next ) {
		this.next = next;
	}

	BasicTypeElement.prototype.randomize = function ( input, minFactor, maxFactor ) {
		return input * ( minFactor + ( Math.random() * ( maxFactor - minFactor ) ) );
	}

	BasicTypeElement.prototype.basicSetup = function ( args ) {
		args = args || [];

		this.parent = args.parent;
		this.nr = args.nr;
		this.self = args.self;
		this.prev = args.prev || false;
		this.delay = args.delay || this.defaultDelay || false;

		if ( this.isElement === true ) {
			this.$self = $( this.self );
			this.$self.addClass( "ns" );
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
	}

	BasicTypeElement.prototype.getDelay = function () {
		return this.delay / ( _globals.typeSpeedMultiplyer || 1 );
	}

	BasicTypeElement.prototype.startReveal = function ( parentCallback, delay ) {
		delay = delay || this.getDelay();

		this.parentCallbackAfterReveal = parentCallback;

		this.$self.addClass( "s" ).removeClass( "ns" );

		if ( this.beforeRevealCountdown ) { 
			this.beforeRevealCountdown(); 
		}

		if ( delay > 0 ) {
			timerController.addTimeout( this.reveal.bind( this ), delay );
		} else {
			this.reveal();
		}
	}

	BasicTypeElement.prototype.afterReveal = function () {
		if ( this.afterDelay > 0 ) {
			timerController.addTimeout( this.finish.bind( this ), this.afterDelay );
		} else {
			this.finish();
		}
	}

	BasicTypeElement.prototype.finish = function () {
		this.$self.addClass( "done" );
		if( this.parentCallbackAfterReveal ) {
			this.parentCallbackAfterReveal();
		}	
	}

	BasicTypeElement.prototype.reveal = function () {
		if( this.afterReveal ) {
			this.afterReveal();
		}
	}

	BasicTypeElement.prototype.moveToStartFirst = function () {
		this.notRevealedYet = true;
	}

	return BasicTypeElement;
} );

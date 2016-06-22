define( [ "helper/errorMessenger" ], function ( errorMessenger ) {

	function BasicTypeElement () {};

	BasicTypeElement.prototype.name = "BasicTypeElement";

	BasicTypeElement.prototype.addNext = function ( next ) {
		this.next = next;
	}

	BasicTypeElement.prototype.basicSetup = function ( args ) {
		args = args || [];

		this.parent = args.parent;
		this.nr = args.nr;
		this.self = args.self;
		this.prev = args.prev || false;

		if ( this.isElement === true ) {
			this.$self = $( this.self );
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

	BasicTypeElement.prototype.startReveal = function ( parentCallback ) {
		var delay = ( this.defaultDelay || 0 ) * ( 1 + 5 * Math.random() );

		this.parentCallbackAfterReveal = parentCallback;

		if ( this.beforeRevealCountdown ) { this.beforeRevealCountdown(); }
		setTimeout( this.reveal.bind( this ), delay );
	}

	BasicTypeElement.prototype.reveal = function () {
		this.$self.addClass( "s" );
		if ( this.hasChildren === true && this.revealChildren ) {
			this.revealChildren();
		} else {
			if( this.parentCallbackAfterReveal ) {
				this.parentCallbackAfterReveal();
			}
		}
	}

	return BasicTypeElement;
} );

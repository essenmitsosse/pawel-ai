define( [ "debug/errorMessenger" ], function ( errorMessenger ) {

	function BasicTypeElement () {

	};

	BasicTypeElement.prototype.addNext = function ( next ) {
		this.next = next;
	}

	BasicTypeElement.prototype.basicSetup = function ( nr, self, prev, parent ) {
		this.parent = parent;
		this.nr = nr;
		this.self = self;
		this.$self = $( self );

		if ( this.hasChildren === true ) {
			this.childList = [];
		}

		// add this as the next Element to the previous Element
		if ( this.prev !== false ) {
			this.prev.addNext( this );
		}
	}

	return BasicTypeElement;
} );

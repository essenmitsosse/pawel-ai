define( [], function () {
	function KeyBoardShortCut ( args, callback ) {
		this.key = args.key;
		this.ctrl = args.ctrl || false;
		this.shift = args.shift || false;
		this.callback = callback;
	}

	KeyBoardShortCut.prototype.checkKeyPress = function ( key, ctrl, shift ) {
		if ( this.key == key && this.ctrl == ctrl && this.shift == shift ) {
			this.callback();
		}
	}

	return KeyBoardShortCut;
} );
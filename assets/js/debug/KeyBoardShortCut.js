define( [], function () {
	function KeyBoardShortCut( args, callback ) {
		this.key = args.key;
		this.ctrl = args.ctrl || false;
		this.shift = args.shift || false;
		this.callback = callback;
	}

	KeyBoardShortCut.prototype.checkKeyPress = function ( key, ctrl, shift, event ) {
		if ( this.key === key && this.ctrl === ctrl && this.shift === shift ) {
			event.preventDefault();
			this.callback();
		}
	};

	return KeyBoardShortCut;
} );

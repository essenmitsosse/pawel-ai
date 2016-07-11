define( [ "helper/cache", "debug/KeyBoardShortCut" ], function ( _cache, KeyBoardShortCut ) {
	var keyBoardShortCuts = [],
		$window = _cache.$window;

	function addKeyboardShortcut( args, callback ) {
		keyBoardShortCuts.push( new KeyBoardShortCut( args, callback ) );
	}

	function checkAllShortCuts( event ) {
		var key = event.keyCode,
			ctrl = event.ctrlKey,
			shift = event.shiftKey;

		function checkSingleShortCut( shortCut ) {
			shortCut.checkKeyPress( key, ctrl, shift, event );
		}

		keyBoardShortCuts.forEach( checkSingleShortCut );
	}

	$window.keydown( checkAllShortCuts );

	function PrevNextKeyboardShortcut() {
		this.shortcut = new KeyBoardShortCut( {
			key: 39
		}, this.next.bind( this ) );

		keyBoardShortCuts.push( this.shortcut );
	}

	PrevNextKeyboardShortcut.prototype.next = function () {
		if ( this.nextCallback ) {
			this.nextCallback();
			this.removeNext();
		}
	};

	PrevNextKeyboardShortcut.prototype.addNext = function ( callback ) {
		this.nextCallback = callback;
	};

	PrevNextKeyboardShortcut.prototype.removeNext = function () {
		this.nextCallback = false;
	};

	return {
		addKeyboardShortcut: addKeyboardShortcut,
		prevNextKeyboardShortcut: new PrevNextKeyboardShortcut()
	};
} );

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

	return {
		addKeyboardShortcut: addKeyboardShortcut
	};
} );

define( [ "helper/vars", "debug/KeyBoardShortCut" ], function ( _vars, KeyBoardShortCut ) {
	var keyBoardShortCuts = [];
	
	function addKeyboardShortcut ( args, callback ) {
		keyBoardShortCuts.push( new KeyBoardShortCut( args, callback ) );
	};

	function checkAllShortCuts( event ) {
		var key = event.keyCode,
			ctrl = event.ctrlKey,
			shift = event.shiftKey;

		function checkSingleShortCut( shortCut ) {
			shortCut.checkKeyPress( key, ctrl, shift );
		}

		keyBoardShortCuts.forEach( checkSingleShortCut );
	};

	$_window.keydown( checkAllShortCuts );

	return {
		addKeyboardShortcut: addKeyboardShortcut
	};
} );
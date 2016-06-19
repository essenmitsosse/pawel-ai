define( [ "helper/vars", "helper/globals", "debug/keyboardHandler" ], function ( _vars, _globals, keyboardHandler ) {
	function setDebug( value ) {
		_globals.isDebug = value;
		if ( !value ) {
			_vars.$body.removeClass( "debug" );
		} else {
			_vars.$body.addClass( "debug" );
		}
	}

	function setSuperDebug( value ) {
		_globals.isSuperDebug = value;
		setDebug( value );
		if ( !value ) {
			_vars.$body.removeClass( "superdebug" );
		} else {
			_vars.$body.addClass( "superdebug" );
		}
	}

	function toggleDebug() {
		setDebug( !_globals.isDebug );
	}

	function toggleSuperDebug() {
		setSuperDebug( !_globals.isSuperDebug );
	}

	keyboardHandler.addKeyboardShortcut( { key: 71, ctrl: true, }, toggleDebug );
	keyboardHandler.addKeyboardShortcut( { key: 71, ctrl: true, shift: true }, toggleSuperDebug );
	setDebug( _globals.isDebug ); // inital setup
} );
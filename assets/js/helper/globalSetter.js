define( [ "helper/globals", "helper/const", "helper/errorMessenger" ], function ( _globals, _const, errorMessenger ) {
	
	function setGlobal ( name, value ) {
		if ( name in _globals ) {
			_globals[ name ] = value;
			if ( !value ) {
				_const.$body.removeClass( name );
			} else {
				_const.$body.addClass( name );
			}
		} else {
			errorMessenger.throwError( "Tried to set global \"" + name + "\", which doesn’t exist." );
		}		
	}

	function toggleGlobal ( name ) {
		setGlobal( name, !_globals[ name ] );
	}

	function getGlobalToggler ( name ) {
		return function () {
			toggleGlobal( name );
		};
	}

	function initGlobals() {
		var key;

		for( key in _globals ) {
			setGlobal( key, _globals[ key ] );
		}
	}

	initGlobals();

	return {
		setGlobal: setGlobal,
		toggleGlobal: toggleGlobal,
		getGlobalToggler: getGlobalToggler
	};
} );

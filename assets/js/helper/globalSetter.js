define( [ "helper/globals", "helper/cache", "helper/errorMessenger" ], function ( _globals, _cache, errorMessenger ) {
	
	function setGlobal ( name, value, userInput ) {
		if ( name in _globals ) {
			_globals[ name ] = value;
			if ( !value ) {
				_cache.$body.removeClass( name );
			} else {
				_cache.$body.addClass( name );
			}

			if( userInput ) {
				errorMessenger.sendMessage( "Global variable \"" + name + "\" has been set to " + value );
			}
		} else {
			errorMessenger.throwError( "Tried to set global \"" + name + "\", which doesn’t exist." );
		}		
	}

	function toggleGlobal ( name, userInput ) {
		setGlobal( name, !_globals[ name ], userInput );
	}

	function getGlobalToggler ( name ) {
		return function () {
			toggleGlobal( name, true );
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

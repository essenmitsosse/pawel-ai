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
				errorMessenger.sendMessage( "Global variable \"" + name + "\" has been set to " + value + "." );
			}
		} else {
			errorMessenger.throwError( "Tried to set global \"" + name + "\", which doesn’t exist." );
		}		
	}

	function changeGlobal ( name, value, userInput ) {
		if ( name in _globals ) {
			if ( typeof value === "number" ) {
				_globals[ name ] += value;

				direction = value < 0 ? "decreased" : "increased";

				errorMessenger.sendMessage( "Global variable \"" + name + "\" has been " + direction + " to " + ( Math.round( _globals[ name ] * 10 ) / 10 ) + "." );
			} else {
				errorMessenger.throwError( "Tried to change global \"" + name + "\", by " + value + ", which isn’t a number." );
			}
		} else {
			errorMessenger.throwError( "Tried to change global \"" + name + "\", which doesn’t exist." );
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

	function getGlobalChanger ( name, value ) {
		return function () {
			changeGlobal( name, value, true );
		}
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
		getGlobalToggler: getGlobalToggler,
		getGlobalChanger: getGlobalChanger
	};
} );

define( [ "helper/globals", "helper/errorMessenger" ], function ( _globals, errorMessenger ) {
	var query = window.location.search.substring(1),
		vars = query.split("&");

	function findMatchingGlobal( name, value ) {
		var key;

		for ( key in _globals ) {
			if ( name.toUpperCase() === key.toUpperCase() ) {
				return key;
			}
		}

		return false;
	}

	function getTypeOfGlobal ( nameOfGlobal ) {
		var value = _globals[ nameOfGlobal ];
		return typeof value;
	}

	function toBoolean ( value ) {
		switch ( value ) {
			case "0": 		return false;
			case "1": 		return true;
			case "false": 	return false;
			case "true": 	return true;
			case 0: 		return false;
			case 1: 		return true;
			case false: 	return false;
			case true: 		return true;
		}
		return null;
	}

	function toNumber ( value ) {
		return Number( value );
	}

	function toString ( value ) {
		return String( value );
	}

	function analiseVar( obj ) {

		if ( obj === "" ) { return; }

		var objParts = obj.split( "=" ),
			name = objParts[ 0 ],
			value = objParts[ 1 ],
			nameOfGlobal = findMatchingGlobal( name, value ),
			typeOfGlobal,
			newValue;

		if ( nameOfGlobal === false ) {
			var ErrorMessage = [
					"You tried to set a global called \"" + name + "\", to \"" + value + "\" which isn’t a global variable.",
					"\"" + name + "\" isn’t a global variable",
					"Please check your spelling.",
					"Possible global variables are: "
				];

			for ( key in _globals ) {
				ErrorMessage.push( "— " + key );
			}

			errorMessenger.sendMessage( ErrorMessage );
		}

		typeOfGlobal = getTypeOfGlobal( nameOfGlobal );

		switch ( typeOfGlobal ) {
			case "boolean":
				convertFunction = toBoolean;
				break;
			case "number":
				convertFunction = toNumber;
				break;
			case "string":
				convertFunction = toString;
				break;
		}

		newValue = convertFunction( value );

		if ( !isNaN( newValue ) && newValue !== null ) {
			_globals[ nameOfGlobal ] = newValue;
		} else {
			errorMessenger.sendMessage( [
				"You tried to set the Global \"" + nameOfGlobal + "\" to \"" + value + "\".",
				"\"" + nameOfGlobal + "\" is supposed to be a " + typeOfGlobal + ".",
				"\"" + value + "\" can not be converted to a " + typeOfGlobal + "."
 			] );
		}

		
	}

	vars.forEach( analiseVar );

} );
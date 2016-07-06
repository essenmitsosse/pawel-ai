define( [], function () {

	function showErrorMessage( message, throwError ) {
		if ( message instanceof Array ) {
			message = message.join( "\n" );
		}

		if ( throwError ) {
			throw ( message );
		} else {
			console.log( message );
		}
	}

	function sendMessage( message ) {
		showErrorMessage( message, false );
	}

	function throwError( message ) {
		showErrorMessage( message, true );
	}

	function markErrorElement( errorElement, errorParent ) {
		errorElement.addClass( "error" );

		if ( errorParent ) {
			errorParent.addClass( "error-parent" );
		}
	}

	return {
		sendMessage: sendMessage,
		markErrorElement: markErrorElement,
		throwError: throwError
	};
} );

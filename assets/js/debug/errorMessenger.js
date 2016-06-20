define( [], function () {

	function sendMessage ( message ) {
		if ( message instanceof Array ) {
			console.log( message.join( "\n" ) );
		} else {
			console.log( message );
		}
		
	}

	function markErrorElement ( errorElement, errorParent ) {
		errorElement.addClass( "error" );

		if ( errorParent ) {
			errorParent.addClass( "error-parent" );
		}
	}

	return {
		sendMessage: sendMessage,
		markErrorElement: markErrorElement
	};
} );
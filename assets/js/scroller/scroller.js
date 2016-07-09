define( [ "helper/cache", "helper/globals" ], function ( _cache, _globals ) {
	var $htmlBody = _cache.$htmlBody,
		isScrolling = false,
		currentPosition = 0;

	function checkForScrollAbort() {
		// $htmlBody.on( "scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", stopScroll );
	}

	function scrollDone() {
		isScrolling = false;
		$htmlBody.stop();
		// $htmlBody.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
	}

	// function stopScroll( event ) {
	// 	var isAbort = true;
	//
	// 	if ( event.type === "keyup" ) {
	// 		isAbort = false;
	// 	}
	//
	// 	if ( isAbort ) {
	// 		scrollDone();
	// 	}
	// }

	function scrollToCurrentPosition( duration ) {
		duration /= ( _globals.typeSpeedMultiplyer || 1 );

		$htmlBody.stop()
			.animate( {
				scrollTop: currentPosition
			}, duration || 250, scrollDone );
	}

	function scrollTo( duration, offset ) {
		duration = duration || 500;
		offset = offset || 0;

		// make sure we stop scrolling if we are currently doing so
		scrollDone();

		isScrolling = true;

		currentPosition = _cache.$document.height() - _cache.$window.height();

		checkForScrollAbort();
		scrollToCurrentPosition( duration );
	}

	// function scrollToCenterElement( $element, duration ) {
	// 	if ( !_globals.allowScroll && !_globals.noAnimation && !_globals.isPaused ) {
	// 		scrollTo( $element, duration, 0 );
	// 	}
	// }

	function scrollToBottom( duration ) {
		if ( !_globals.allowScroll && !_globals.noAnimation && !_globals.isPaused ) {
			scrollTo( duration, 0 );
		}
	}

	$htmlBody.on( "scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function ( e ) {
		if ( !_globals.allowScroll && !_globals.noAnimation && !_globals.isPaused ) {
			e.preventDefault();
			e.stopPropagation();
		}
	} );

	return {
		scrollTo: scrollTo,
		scrollToBottom: scrollToBottom,
		scrollToCurrentPosition: scrollToCurrentPosition
	};
} );

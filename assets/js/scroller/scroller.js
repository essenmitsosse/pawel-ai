define( [ "helper/cache", "helper/globals" ], function ( _cache, _globals ) {
	var $htmlBody = _cache.$htmlBody,
		$window = _cache.$window,
		isScrolling = false,
		currentPosition = 0;

	function checkForScrollAbort () {
		// $htmlBody.on( "scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", stopScroll );
	}

	function scrollDone () {
		isScrolling = false;
		$htmlBody.stop();
		// $htmlBody.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
	}

	function stopScroll ( event ) {
		var isAbort = true;

		if( event.type === "keyup" ) {
			isAbort = false;
		}

		if ( isAbort ) {
			scrollDone();
		}
	}

	function scrollToCurrentPosition ( duration ) {
		$htmlBody.animate({
			scrollTop: currentPosition
		}, duration || 250, scrollDone );
	}

	function scrollTo( $element, duration, offset ) {
		duration = duration || 500;
		offset = offset || 0;

		// make sure we stop scrolling if we are currently doing so
		scrollDone();

		isScrolling = true;

		currentPosition = $element.offset().top - offset

		checkForScrollAbort();
		scrollToCurrentPosition( duration );
	}

	function scrollToCenterElement( $element, duration ) {
		if ( !_globals.allowScroll && !_globals.noAnimation && !_globals.isPaused ) {
			scrollTo( $element, duration, 0 );
		}
	}

	$htmlBody.on( "scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function( e ) {
		if ( !_globals.allowScroll && !_globals.noAnimation && !_globals.isPaused ) {
			e.preventDefault();
			e.stopPropagation();
		}
	})

	return {
		scrollTo: scrollTo,
		scrollToCenterElement: scrollToCenterElement,
		scrollToCurrentPosition: scrollToCurrentPosition
	}
} );

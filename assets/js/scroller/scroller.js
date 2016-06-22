define( [ "helper/cache", "helper/globals" ], function ( _cache, _globals ) {
	var $htmlBody = _cache.$htmlBody,
		$window = _cache.$window,
		isScrolling = false;

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

	function scrollTo( $element, duration, offset ) {
		duration = duration || 500;
		offset = offset || 0;

		// make sure we stop scrolling if we are currently doing so
		scrollDone();

		isScrolling = true;

		checkForScrollAbort();

		$htmlBody.animate({
			scrollTop: $element.offset().top - offset
		}, duration, scrollDone );
	}

	function scrollToCenterElement( $element, duration ) {
		if ( !_globals.allowScroll && !_globals.noAnimation ) {
			scrollTo( $element, duration, ( $window.height() - $element.height() ) / 2 );
		}
	}

	$htmlBody.on( "scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function( e ) {
		if ( !_globals.allowScroll && !_globals.noAnimation ) {
			e.preventDefault();
			e.stopPropagation();
		}
	})

	return {
		scrollTo: scrollTo,
		scrollToCenterElement: scrollToCenterElement
	}
} );

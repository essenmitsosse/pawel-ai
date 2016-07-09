/* globals $body, $htmlBody, $window */
define( [], function () {
	return {
		$body: $body,
		$htmlBody: $htmlBody,
		$window: $window,
		$document: $( document ),
		$main: $( "#main-content" ),
		$chaptersWrapper: $( "#chapters-wrapper" )
	};
} );

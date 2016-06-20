define( [ "typewriter/classes/Chapter" ], function ( Chapter ) {
	chapterList = [];

	function chapterFactory ( nr, chapter ) {
		var args = {
				nr: nr,
				self: chapter,
				prev: chapterList[ chapterList.length - 1 ]
			},
			newElement = new Chapter( args );

		chapterList.push( newElement );
	};

	$( ".chapter" ).each( chapterFactory );

	chapterList[ 0 ].startReveal();
} );

define( [ "typewriter/classes/Chapter" ], function ( Chapter ) {
	var chapterList = [],
		currentChapter = 0;

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

	function showNextChapter () {
		if ( currentChapter < chapterList.length ) {
			chapterList[ currentChapter ].startReveal( showNextChapter );
			currentChapter += 1;
		}		
	}

	showNextChapter();
} );

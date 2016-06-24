define( [ "helper/cache", "typewriter/classes/Chapter" ], function ( _cache, Chapter ) {
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

	function removeCurrentChapter () {
		chapterList[ currentChapter ].removeChapter();
		currentChapter += 1;
		showNextChapter();
	}

	function showNextChapter () {
		if ( currentChapter < chapterList.length ) {
			chapterList[ currentChapter ].startReveal( removeCurrentChapter, 2000 );
		}		
	}

	function whenFontsHaveLoaded () {
		$( ".chapter" ).each( chapterFactory );
		showNextChapter();
		_cache.$body.addClass( "ready" );
	}

	if ( document.fonts && document.fonts.ready ) { // Chrome and Firefox
		document.fonts.ready.then( whenFontsHaveLoaded );
	} else {
		whenFontsHaveLoaded();	
	}
	
} );

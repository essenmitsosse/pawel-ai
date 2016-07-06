define( [ "helper/cache", "helper/globals", "typewriter/classes/Chapter" ], function ( _cache, _globals, Chapter ) {
	var chapterList = [],
		chapterNameList = {},
		currentChapter = 0,
		first = true,
		showNextChapter,
		removeCurrentChapter;

	function chapterFactory( nr, chapter ) {
		var args = {
				nr: nr,
				self: chapter,
				prev: chapterList[ chapterList.length - 1 ]
			},
			newElement = new Chapter( args );

		chapterNameList[ newElement.ID ] = nr;

		chapterList.push( newElement );
	}

	showNextChapter = function ( delay ) {
		if ( currentChapter < chapterList.length ) {
			if ( !_globals.noAnimation ) {
				chapterList[ currentChapter ].reset()
					.startReveal( removeCurrentChapter, first ? 0 : delay );
				first = false;
			}
		}
	};

	removeCurrentChapter = function () {
		var removingDuration = chapterList[ currentChapter ].removeChapter();
		currentChapter += 1;
		showNextChapter( removingDuration || 0 );
	};

	function whenFontsHaveLoaded() {
		_cache.chapterLength = $( ".chapter" )
			.length;
		$( ".chapter" )
			.each( chapterFactory );
		_cache.$body.addClass( "ready" );

		if ( _globals.start && chapterNameList[ _globals.start ] !== undefined ) {
			currentChapter = chapterNameList[ _globals.start ];
		}

		showNextChapter( 0 );

	}

	// function jumpToChapter( chapterID ) {}
	//
	// window.jumpToChapter = jumpToChapter;

	if ( document.fonts && document.fonts.ready ) { // Chrome and Firefox
		document.fonts.ready.then( whenFontsHaveLoaded );
	} else {
		whenFontsHaveLoaded();
	}

} );

define( [
	"helper/cache",
	"helper/globals",
	"menu/chapterMenu",
	"typewriter/classes/Chapter",
	"timer/controller"
], function ( _cache, _globals, chapterMenu, Chapter, timerController ) {
	var chapterList = [],
		chapterNameList = {},
		currentChapter = 0,
		first = true,
		showNextChapter,
		afterChapterFinished;

	function chapterFactory( nr, chapter ) {
		var args = {
				nr: nr,
				self: chapter,
				prev: chapterList[ chapterList.length - 1 ]
			},
			newElement = new Chapter( args );

		chapterNameList[ newElement.ID ] = nr;

		chapterList.push( newElement );
		chapterMenu.addMenu( newElement );
	}

	showNextChapter = function ( delay ) {
		if ( currentChapter < chapterList.length ) {
			if ( !_globals.noAnimation ) {
				chapterList[ currentChapter ].reset()
					.startReveal( afterChapterFinished, first ? 0 : delay );
				first = false;
			}
		} else {
			location.reload();
		}
	};

	function removeCurrentChapter() {
		var removingDuration = chapterList[ currentChapter ].removeChapter();
		currentChapter += 1;
		showNextChapter( removingDuration || 0 );
	}

	afterChapterFinished = function () {
		removeCurrentChapter();
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

	function jumpToChapter( chapterID ) {
		window.jump = true;
		var chapterNr;

		chapterList[ currentChapter ].reset();

		chapterNr = chapterNameList[ chapterID ];

		timerController.stopAll();
		currentChapter = chapterNr;
		showNextChapter();
	}

	if ( document.fonts && document.fonts.ready ) { // Chrome and Firefox
		document.fonts.ready.then( whenFontsHaveLoaded );
	} else {
		whenFontsHaveLoaded();
	}

	return {
		jumpToChapter: jumpToChapter
	};

} );

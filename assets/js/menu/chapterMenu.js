define( [], function () {
	var chapterList = [],
		$tableOfContent = $( "#tableOfContent" ),
		$list = $tableOfContent.find( ".chapter-list" );

	function ChapterListItem( chapter ) {
		this.chapter = chapter;
		this.name = chapter.name;
		this.ID = chapter.ID;
		this.nr = chapter.nr;

		this.$listItem = $( "<li/>" );
		this.$link = $( "<a/>", {
				text: this.name,
				href: "#" + this.ID,
			} )
			.appendTo( this.$listItem )
			.on( "click", this.chapterClick.bind( this ) );

		$list.append( this.$listItem );
	}

	ChapterListItem.prototype.chapterClick = function ( event ) {
		event.preventDefault();
		require( "menu/menuFactory" )
			.hideAllMenuItems();
		require( "typewriter/chapterFactory" )
			.jumpToChapter( this.ID );
	};

	function addMenu( chapter ) {
		chapterList.push( new ChapterListItem( chapter ) );
	}

	return {
		addMenu: addMenu
	};
} );

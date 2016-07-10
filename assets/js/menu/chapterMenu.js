define( [], function () {
	var chapterList = [],
		$tableOfContent = $( "#tableOfContent" ),
		$list = $tableOfContent.find( ".chapter-list" );

	function ChapterListItem( chapter ) {
		this.chapter = chapter;
		this.name = chapter.name;
		this.ID = chapter.ID;

		this.$listItem = $( "<li/>" );
		this.$link = $( "<a/>", {
				text: this.name,
				href: "#" + this.ID,
			} )
			.appendTo( this.$listItem );

		$list.append( this.$listItem );
	}

	function addMenu( chapter ) {
		chapterList.push( new ChapterListItem( chapter ) );
	}

	return {
		addMenu: addMenu
	};
} );

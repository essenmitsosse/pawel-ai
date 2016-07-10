define( [
	"helper/cache"
], function ( _cache ) {
	var $menuWrapper = _cache.$menuWrapper,
		$menuTitleHeading = $( "<h1/>" )
		.on( "click", toggleVisibility ),
		$menuTitleContent = $( "<div/>", {
			"class": "menuTitleContent"
		} )
		.hide(),
		$menuTitleWrapper = $( "<div/>", {
			"id": "menuTitle"
		} )
		.append( $menuTitleHeading )
		.append( $menuTitleContent )
		.appendTo( $menuWrapper ),
		visible = false;

	function toggleVisibility() {
		var hideAllMenuItems = require( "menu/menuFactory" )
			.hideAllMenuItems;
		if ( visible ) {
			hideAllMenuItems();
		} else {
			hideAllMenuItems( {
				name: "ChapterTitle",
				hide: hide,
				show: show
			} );
		}
	}

	function updateChapterTitle( chapter ) {
		$menuTitleHeading.html( chapter.name );
		$menuTitleContent.html( chapter.aboutContent );
	}

	function show() {
		console.log( "show" );
		$menuTitleWrapper.addClass( "show" );
		$menuTitleContent.slideDown( "fast" );
		visible = true;
	}

	function hide() {
		$menuTitleWrapper.removeClass( "show" );
		$menuTitleContent.slideUp( "fast" );
		visible = false;
	}

	return {
		name: "ChapterTitle",
		updateChapterTitle: updateChapterTitle,
		show: show,
		hide: hide
	};
} );

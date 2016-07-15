define( [
	"helper/cache"
], function ( _cache ) {
	var $menuWrapper = _cache.$menuWrapper,
		$menuTitleHeading,
		$menuTitleContent,
		$menuTitleWrapper,
		visible = false,
		isChecked,
		isRead,

		toggleVisibility,
		updateChapterTitle,
		show,
		hide,
		read,
		reset,
		check;

	toggleVisibility = function () {
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
	};

	updateChapterTitle = function ( chapter ) {
		$menuTitleHeading.html( chapter.name );
		$menuTitleContent.html( chapter.aboutContent );
		reset();
	};

	show = function () {
		console.log( "show" );
		$menuTitleWrapper.addClass( "show" );
		$menuTitleContent.slideDown( "fast" );
		visible = true;
		read();
	};

	hide = function () {
		$menuTitleWrapper.removeClass( "show" );
		$menuTitleContent.slideUp( "fast" );
		visible = false;
	};

	read = function () {
		if ( isChecked && !isRead ) {
			$menuTitleHeading.html( $menuTitleHeading.html() + "✓" );
			isRead = true;
		}
	};

	reset = function () {
		isChecked = false;
		isRead = false;
	};

	check = function () {
		isChecked = true;
		isRead = false;
		$menuTitleHeading.html( $menuTitleHeading.html() + " ✓" );
	};

	$menuTitleHeading = $( "<h1/>" )
		.on( "click", toggleVisibility );

	$menuTitleContent = $( "<div/>", {
			"class": "menuTitleContent"
		} )
		.hide();

	$menuTitleWrapper = $( "<div/>", {
			"id": "menuTitle"
		} )
		.append( $menuTitleHeading )
		.append( $menuTitleContent )
		.appendTo( $menuWrapper );

	return {
		name: "ChapterTitle",
		updateChapterTitle: updateChapterTitle,
		show: show,
		hide: hide,
		check: check
	};
} );

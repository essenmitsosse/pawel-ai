define( [
	"helper/cache",
	"helper/globals",
	"menu/MenuObject",
	"menu/chapterTitle",
	"menu/playPause",
], function ( _cache, _globals, MenuObject, chapterTitle, PlayPause ) {
	var $menuWrapper = _cache.$menuWrapper,
		$menus = $menuWrapper.children(),
		$menuIconWrapper = $( "<ul/>", {
			"id": "menuIconWrapper"
		} ),
		menuList = [];

	function hideAllMenuItems( except ) {

		function hideOrShowElement( element ) {
			if ( !except || element.name !== except.name ) {
				if ( typeof element.hide === "function" ) {
					element.hide();
				}
			} else {
				if ( typeof element.show === "function" ) {
					element.show();
				}
			}
		}

		menuList.forEach( hideOrShowElement );

		if ( except && except.name ) { // if menu item is being shown
			_cache.$body.attr( "data-menu", except.name );
			require( "timer/controller" )
				.pauseAllTimeouts( true ); // isMenu -> true
		} else { // if NO menu item is being shown
			_cache.$body.removeAttr( "data-menu" );
			require( "timer/controller" )
				.resumeAllTimeouts( true );
		}
	}

	function prepareMenu( nr, menu ) {
		if ( $( menu )
			.data( "name" ) ) {
			menuList.push( new MenuObject( menu, $menuIconWrapper, hideAllMenuItems ) );
		}
	}

	$menus.each( prepareMenu );
	menuList.push( chapterTitle );
	menuList.push( new PlayPause( $menuIconWrapper ) );
	$menuWrapper.append( $menuIconWrapper );

	return {
		hideAllMenuItems: hideAllMenuItems
	};
} );

define( [
	"helper/cache",
	"helper/globals",
	"menu/MenuObject",
	"menu/chapterTitle",
	"timer/controller"
], function ( _cache, _globals, MenuObject, chapterTitle, timerController ) {
	var $menuWrapper = _cache.$menuWrapper,
		$menus = $menuWrapper.children(),
		$menuIconWrapper = $( "<ul/>", {
			"id": "menuIconWrapper"
		} ),
		menuList = [];

	function hideAllMenuItems( except ) {

		function hideOrShowElement( element ) {
			if ( !except || element.name !== except.name ) {
				element.hide();
			} else {
				element.show();
			}
		}

		menuList.forEach( hideOrShowElement );

		if ( except && except.name ) { // if menu item is being shown
			_cache.$body.attr( "data-menu", except.name )
				.addClass( "showMenu" );
			timerController.pauseAllTimeouts();
		} else { // if NO menu item is being shown
			_cache.$body.removeAttr( "data-menu" )
				.removeClass( "showMenu" );
			timerController.resumeAllTimeouts();
		}
	}

	function prepareMenu( nr, menu ) {
		menuList.push( new MenuObject( menu, $menuIconWrapper, hideAllMenuItems ) );
	}

	$menus.each( prepareMenu );
	menuList.push( chapterTitle );
	$menuWrapper.append( $menuIconWrapper );

	return {
		hideAllMenuItems: hideAllMenuItems
	};
} );

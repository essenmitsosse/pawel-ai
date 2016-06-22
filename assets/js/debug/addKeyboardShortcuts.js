define( [ "helper/globalSetter", "debug/keyboardHandler" ], function ( globalSetter, keyboardHandler ) {

	// noAnimation
	keyboardHandler.addKeyboardShortcut( { key: 65, ctrl: true, }, globalSetter.getGlobalToggler( "noAnimation" ) );
	
	// noScroll
	keyboardHandler.addKeyboardShortcut( { key: 83, ctrl: true, }, globalSetter.getGlobalToggler( "allowScroll" ) );
	
	// debug
	keyboardHandler.addKeyboardShortcut( { key: 71, ctrl: true, }, globalSetter.getGlobalToggler( "grid" ) );
	
	// superdebug
	keyboardHandler.addKeyboardShortcut( { key: 71, ctrl: true, shift: true }, globalSetter.getGlobalToggler( "superGrid" ) );
} );
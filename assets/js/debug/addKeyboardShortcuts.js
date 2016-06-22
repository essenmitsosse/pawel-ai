define( [ "helper/vars", "helper/globalSetter", "debug/keyboardHandler" ], function ( _vars, globalSetter, keyboardHandler ) {

	// noAnimation
	keyboardHandler.addKeyboardShortcut( { key: 71, ctrl: true, }, globalSetter.getGlobalToggler( "noAnimation" ) );
	
	// debug
	keyboardHandler.addKeyboardShortcut( { key: 71, ctrl: true, }, globalSetter.getGlobalToggler( "debug" ) );
	
	// superdebug
	keyboardHandler.addKeyboardShortcut( { key: 71, ctrl: true, shift: true }, globalSetter.getGlobalToggler( "superDebug" ) );
} );
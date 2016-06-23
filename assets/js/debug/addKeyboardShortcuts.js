define( [ 
	"helper/globalSetter", 
	"debug/keyboardHandler", 
	"timer/controller" 
	], function ( globalSetter, keyboardHandler, timerController ) {

	// change typeSpeedMultiplyer 'CTRL +' 'Ctrl -'
	keyboardHandler.addKeyboardShortcut( { key: 187, ctrl: true, }, globalSetter.getGlobalChanger( "typeSpeedMultiplyer", 0.1 ) );
	keyboardHandler.addKeyboardShortcut( { key: 189, ctrl: true, }, globalSetter.getGlobalChanger( "typeSpeedMultiplyer", -0.1 ) );

	// noAnimation 'SPACEBAR'
	keyboardHandler.addKeyboardShortcut( { key: 32 }, timerController.toggleAllTimeouts );
	
	// noAnimation 'CTRL A'
	keyboardHandler.addKeyboardShortcut( { key: 65, ctrl: true, }, globalSetter.getGlobalToggler( "noAnimation" ) );
	
	// noScroll 'CTRL S'
	keyboardHandler.addKeyboardShortcut( { key: 83, ctrl: true, }, globalSetter.getGlobalToggler( "allowScroll" ) );
	
	// debug 'CTRL + G'
	keyboardHandler.addKeyboardShortcut( { key: 71, ctrl: true, }, globalSetter.getGlobalToggler( "grid" ) );
	
	// superdebug 'CTRL + SHIFT + G'
	keyboardHandler.addKeyboardShortcut( { key: 71, ctrl: true, shift: true }, globalSetter.getGlobalToggler( "superGrid" ) );
} );
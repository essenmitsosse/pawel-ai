define( [
	"helper/const",
	"helper/globals",
	"debug/keyboardHandler",
	"typewriter/classes/BasicTypeElement"
], function ( _const, _globals, keyboardHandler, BasicTypeElement ) {

	function Header( args ) {
		this.basicSetup( args );
	}

	Header.prototype = Object.create( BasicTypeElement.prototype );
	Header.prototype.constructor = Header;

	Header.prototype.name = "Header";
	Header.prototype.elementName = "header";
	// Header.prototype.possibleChildElements = [ { elementName: "img", ClassConstructor: Image } ];
	Header.prototype.isElement = true;
	Header.prototype.afterDelay = _const.titleDuration || 1500;

	Header.prototype.finish = function () {
		if ( _globals.pauseAfterChapter ) {
			keyboardHandler.prevNextKeyboardShortcut.addNext( BasicTypeElement.prototype.finish.bind( this ) );
		} else {
			BasicTypeElement.prototype.finish.bind( this )();
		}
	};

	return Header;
} );

define( [ 
	"typewriter/classes/BasicTypeElement", 
	"typewriter/classes/Image", 
	"helper/errorMessenger" 
	], function ( BasicTypeElement, Image, errorMessenger ) {
	
	function Header ( args ) {
		this.basicSetup( args );
	}

	Header.prototype = Object.create( BasicTypeElement.prototype );
	Header.prototype.constructor = Header;

	Header.prototype.name = "Header";
	Header.prototype.elementName = "header";
	// Header.prototype.possibleChildElements = [ { elementName: "img", ClassConstructor: Image } ];
	Header.prototype.isElement = true;
	Header.prototype.afterDelay = 3000;

	return Header;
} );
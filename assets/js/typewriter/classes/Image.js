define( [ "typewriter/classes/BasicTypeElement", "helper/errorMessenger" ], function ( BasicTypeElement, Image, errorMessenger ) {
	function Image( nr, self, prev, parent ) {
		this.basicSetup( nr, self, prev, parent );
	}

	Image.prototype = Object.create( BasicTypeElement.prototype );
	Image.prototype.constructor = Image;

	Image.prototype.name = "Image";
	Image.prototype.elementName = "img";
	Image.prototype.isElement = true;
	Image.prototype.defaultDelay = 50;

	return Image;
} );

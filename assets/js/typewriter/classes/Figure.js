define( [ "typewriter/classes/ParentTypeElement", "typewriter/classes/Video", "typewriter/classes/Image", "helper/errorMessenger" ], function ( ParentTypeElement, Video, Image, errorMessenger ) {
	function Figure( args ) {
		this.basicSetup( args );
	}

	Figure.prototype = Object.create( ParentTypeElement.prototype );
	Figure.prototype.constructor = Figure;

	Figure.prototype.name = "Figure";
	Figure.prototype.elementName = "figure";
	Figure.prototype.possibleChildElements = [ {
		elementName: "img",
		ClassConstructor: Image
	}, {
		elementName: "video",
		ClassConstructor: Video
	} ];
	Figure.prototype.isElement = true;

	return Figure;
} );

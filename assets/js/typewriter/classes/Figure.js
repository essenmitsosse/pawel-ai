define( [ "typewriter/classes/ParentTypeElement", "typewriter/classes/Image", "debug/errorMessenger" ], function ( ParentTypeElement, Image, errorMessenger ) {
	function Figure ( args ) {
		this.basicSetup( args );
	}

	Figure.prototype = Object.create( ParentTypeElement.prototype );
	Figure.prototype.constructor = Figure;

	Figure.prototype.name = "Figure";
	Figure.prototype.elementName = "figure";
	Figure.prototype.possibleChildElements = [ { elementName: "img", ClassConstructor: Image } ];
	Figure.prototype.isElement = true;
	Figure.prototype.defaultDelay = 1000;

	return Figure;
} );
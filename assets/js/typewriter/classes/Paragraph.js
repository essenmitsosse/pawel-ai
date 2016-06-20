define( [ 
	"typewriter/classes/ParentTypeElement", 
	"typewriter/classes/Span", 
	"debug/errorMessenger" 
	], function ( ParentTypeElement, Span, errorMessenger ) {

	function Paragraph ( args ) {
		this.basicSetup( args );
	}

	Paragraph.prototype = Object.create( ParentTypeElement.prototype );
	Paragraph.prototype.constructor = Paragraph;

	Paragraph.prototype.name = "Paragraph";
	Paragraph.prototype.elementName = "p";
	Paragraph.prototype.possibleChildElements = [ 
		{ elementName: "span", ClassConstructor: Span } 
	];
	Paragraph.prototype.isElement = true;
	Paragraph.prototype.defaultDelay = 0;

	return Paragraph;
} );
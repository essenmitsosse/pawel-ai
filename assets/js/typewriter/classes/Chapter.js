define( [ 
	"typewriter/classes/ParentTypeElement", 
	"typewriter/classes/Paragraph", 
	"typewriter/classes/Figure", 
	"debug/errorMessenger" 
	], function ( ParentTypeElement, Paragraph, Figure, errorMessenger ) {

	function Chapter ( args ) {
		this.basicSetup( args );		
	}

	Chapter.prototype = Object.create( ParentTypeElement.prototype );
	Chapter.prototype.constructor = Chapter;

	Chapter.prototype.name = "Chapter";
	Chapter.prototype.elementName = "section.chapter";
	Chapter.prototype.possibleChildElements = [ 
		{ elementName: "p", ClassConstructor: Paragraph }, 
		{ elementName: "figure", ClassConstructor: Figure } 
	];
	Chapter.prototype.isElement = true;
	Chapter.prototype.defaultDelay = 0;

	return Chapter;
} );
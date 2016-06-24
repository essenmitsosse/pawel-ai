define( [ 
	"typewriter/classes/ParentTypeElement", 
	"typewriter/classes/Header", 
	"typewriter/classes/Paragraph", 
	"typewriter/classes/Figure", 
	"cursor/cursor", 
	"helper/errorMessenger" 
	], function ( ParentTypeElement, Header, Paragraph, Figure, cursor, errorMessenger ) {

	function Chapter ( args ) {
		this.basicSetup( args );		
	}

	Chapter.prototype = Object.create( ParentTypeElement.prototype );
	Chapter.prototype.constructor = Chapter;

	Chapter.prototype.name = "Chapter";
	Chapter.prototype.elementName = "section.chapter";
	Chapter.prototype.possibleChildElements = [ 
		{ elementName: "p", ClassConstructor: Paragraph }, 
		{ elementName: "figure", ClassConstructor: Figure } , 
		{ elementName: "header", ClassConstructor: Header }
	];
	Chapter.prototype.isElement = true;

	Chapter.prototype.removeChapter = function () {
		this.$self.addClass( "done" );
		cursor.remove();
	}

	return Chapter;
} );
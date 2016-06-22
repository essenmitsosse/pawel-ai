define( [ 
	"typewriter/classes/ParentTypeElement", 
	"typewriter/classes/Span",
	"scroller/scroller", 
	"helper/errorMessenger" 
	], function ( ParentTypeElement, Span, scroller, errorMessenger ) {

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

	Paragraph.prototype.beforeRevealCountdown = function () {
		scroller.scrollToCenterElement( this.$self, 500 );
	}

	return Paragraph;
} );
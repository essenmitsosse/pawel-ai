define( [
	"helper/globals",
	"typewriter/classes/ParentTypeElement",
	"typewriter/classes/Span",
	"scroller/scroller",
	"helper/errorMessenger"
	], function ( _globals, ParentTypeElement, Span, scroller, errorMessenger ) {

	function Paragraph( args ) {
		this.basicSetup( args );

		this.getMargin();
		this.scrollDelay = 250 + this.topMargin * 250;

		if ( this.childList.length < 1 ) {
			this.displayEmptyElementError();
		}
	}

	Paragraph.prototype = Object.create( ParentTypeElement.prototype );
	Paragraph.prototype.constructor = Paragraph;

	Paragraph.prototype.name = "Paragraph";
	Paragraph.prototype.elementName = "p";
	Paragraph.prototype.possibleChildElements = [
		{
			elementName: "span",
			ClassConstructor: Span
		}
	];
	Paragraph.prototype.isElement = true;

	Paragraph.prototype.beforeRevealCountdown = function () {
		scroller.scrollToBottom( this.scrollDelay );
	};

	return Paragraph;
} );

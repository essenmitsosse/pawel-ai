define( [
	"typewriter/classes/ParentTypeElement",
	"typewriter/classes/Video",
	"typewriter/classes/IFrame",
	"typewriter/classes/Image",
	"scroller/scroller"
], function ( ParentTypeElement, Video, IFrame, Image, scroller ) {
	function Figure( args ) {
		this.basicSetup( args );

		this.getMargin();
		this.scrollDelay = 250 + this.topMargin * 250;
		this.afterDelay = this.$self.data( "delayend" );
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
	}, {
		elementName: "div",
		ClassConstructor: IFrame
	} ];

	Figure.prototype.isElement = true;

	Figure.prototype.beforeRevealCountdown = function () {
		scroller.scrollToBottom( this.scrollDelay );
	};

	return Figure;
} );

define( [
	"helper/cache",
	"helper/const",
	"helper/globals",
	"typewriter/classes/ParentTypeElement",
	"typewriter/classes/Header",
	"typewriter/classes/Paragraph",
	"typewriter/classes/Figure",
	"cursor/cursor",
	"helper/errorMessenger"
	], function ( _chache, _const, _globals, ParentTypeElement, Header, Paragraph, Figure, cursor ) {

	function Chapter( args ) {
		this.basicSetup( args );

		this.ID = this.$self.attr( "id" );
		this.name = this.$self.data( "name" ) || this.$self.find( "header h1" )
			.html() || "KEIN NAME";

		this.$self.css( {
			"z-index": ( _chache.chapterLength - args.nr ) * 1000
		} );

		this.chapterTransition = _const.chapterTransition;
	}

	Chapter.prototype = Object.create( ParentTypeElement.prototype );
	Chapter.prototype.constructor = Chapter;

	Chapter.prototype.name = "Chapter";
	Chapter.prototype.elementName = "section.chapter";
	Chapter.prototype.possibleChildElements = [
		{
			elementName: "p",
			ClassConstructor: Paragraph
		},
		{
			elementName: "figure",
			ClassConstructor: Figure
		},
		{
			elementName: "header",
			ClassConstructor: Header
		}
	];

	Chapter.prototype.isElement = true;

	Chapter.prototype.removeChapter = function () {
		var transitionTime = this.chapterTransition;
		this.$self.css( {
				"transition": "bottom " + ( transitionTime / ( _globals.typeSpeedMultiplyer || 1 ) ) + "ms"
			} )
			.addClass( "done" );
		cursor.remove();

		return transitionTime;
	};

	return Chapter;
} );

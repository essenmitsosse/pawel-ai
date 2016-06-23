define( [ 
	"helper/globals",
	"typewriter/classes/ParentTypeElement",
	"cursor/cursor",
	"timer/controller", 
	"helper/errorMessenger" 
	], function ( _globals, ParentTypeElement, cursor, timerController, errorMessenger ) {

	function Span ( nr, self, prev, parent ) {
		this.basicSetup( nr, self, prev, parent );
	}

	Span.prototype = Object.create( ParentTypeElement.prototype );
	Span.prototype.constructor = Span;

	Span.prototype.name = "Span";
	Span.prototype.elementName = "span";
	Span.prototype.possibleChildElements = [ 
		{ elementName: "character" } 
	];
	Span.prototype.isElement = true;
	Span.prototype.defaultDelay = _globals.defaultBasicTypeSpeed || 30;
	Span.prototype.currentCharacter = 0;
	Span.prototype.typeingForward = true;

	Span.prototype.getDelay = function () {
		return this.randomize( this.delay / ( _globals.typeSpeedMultiplyer || 1 ), 0.25, 4 );
	}

	Span.prototype.getChildren = function () {
		var innerClasses = [ "inner" ];

		if ( this.$self.children().length > 0 ) {
			this.displayChildrenError( 0, this.$self.children() );
		}

		this.rightJustified = this.$self.is(".tr0,.tr1,.tr2,.tr3,.tr4,.tr5,.tr6,.tr7,.tr8,.tr9,.tr10,.tr11,.tr12");

		if ( this.rightJustified ) {
			innerClasses.push( "right" );
		}

		this.fullTextContent = this.$self.html();

		this.characterCount = this.fullTextContent.length;

		// put content in div;
		this.$innerSelf = $( "<span>", {
			html: this.fullTextContent,
			class: innerClasses.join( " " )
		});

		this.$currentCharacterWrapper = $( "<span>" );

		// remove normal content and replace it with the new wrapped content
		this.$self.html( this.$innerSelf );


		if ( this.rightJustified ) {
			this.$innerSelf.css( "width", ( 100 * this.$innerSelf.width() / this.$self.width() ) + "%" );
		} else {
			this.$self.css( "min-width", ( 100 * this.$self.width() / this.parent.$self.width() ) + "%" );
		}
	}

	Span.prototype.revealChildren = function () {
		if ( this.currentCharacter == 0 ) {
			this.$innerSelf.html( this.$currentCharacterWrapper );
		}

		if ( this.currentCharacter < this.characterCount  ) {
			this.currentCharacter += 1;

			var nextChar = this.fullTextContent.substr( this.currentCharacter - 1, 1 );
			if ( nextChar.search( /([\uD800-\uDBFF])/ ) >= 0 ) {
				this.currentCharacter += 1;
			}

			this.$currentCharacterWrapper.html( this.fullTextContent.substr( 0, this.currentCharacter ) );

			cursor.moveToElement( this.$currentCharacterWrapper, true );

			timerController.addTimeout( this.revealChildren.bind( this ), this.getDelay() );
		} else {
			if( this.parentCallbackAfterReveal ) {
				this.parentCallbackAfterReveal();
			}
		}
	}

	return Span;
} );
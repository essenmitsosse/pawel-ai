define( [ 
	"helper/globals",
	"typewriter/classes/ParentTypeElement",
	"cursor/cursor",
	"timer/controller", 
	"helper/errorMessenger" 
	], function ( _globals, ParentTypeElement, cursor, timerController, errorMessenger ) {

	function Span ( nr, self, prev, parent ) {
		this.basicSetup( nr, self, prev, parent );
		this.delayList = this.getDelayList( this.$self );
		this.getRemoveCharList();

		this.delayEnd = this.$self.data( "delayend" );
	}

	Span.prototype = Object.create( ParentTypeElement.prototype );
	Span.prototype.constructor = Span;

	Span.prototype.name = "Span";
	Span.prototype.elementName = "span";
	Span.prototype.possibleChildElements = [ 
		{ elementName: "character" },
		{ elementName: "del" },
		{ elementName: "span" }
	];
	Span.prototype.isElement = true;
	Span.prototype.defaultDelay = _globals.defaultBasicTypeSpeed || 50;
	Span.prototype.currentChar = 0;
	Span.prototype.totalChars = 0;
	Span.prototype.absChars = 0;
	Span.prototype.typeingForward = true;

	Span.prototype.getDelay = function () {
		var delay;

		if ( this.delayEnd && this.currentChar === this.characterCount ) {
			delay = this.delayEnd;
		} else if ( this.delayList && this.delayList.length > this.totalChars ) {
			delay = this.delayList[ this.totalChars ] || this.delay;
		} else {
			delay = this.randomize(  this.delay, 0.25, 4 );
		}

		return delay / ( _globals.typeSpeedMultiplyer || 1 );
	}

	Span.prototype.beforeRevealCountdown = function () {
		if ( this.currentChar == 0 ) {
			this.$innerSelf.html( this.$currentCharWrapper );
		}

		cursor.moveToElement( this.$innerSelf, true );
	}

	Span.prototype.getPosAndLength = function ( $element ) {
		var element = $element[ 0 ],
			length = $element.text().length,
			pos = 0;

		while ( element = element.previousSibling ) {
			pos += element.length;			
		}

		this.inlineList.push({
			length: length,
			pos: pos,
			isDel: $element.is( "del" ),
			delay: $element.data( "delay" ),
			delayEnd: $element.data( "delayend" ),
			delayList: this.getDelayList( $element )
		});
	}

	Span.prototype.getDelayList = function ( $element ) {
		var delayList = $element.data( "delaylist" );

		if ( delayList ) {
			if ( typeof delayList === "number" ) {
				delayList = [ delayList ];
			} else {
				delayList = delayList.split( "," );
				delayList = delayList.map( this.convertToDelay.bind( this ) );
			}
		} else {
			delayList = [];
		}

		return delayList;
	}

	Span.prototype.getRemoveCharList = function () {
		var removeCharList = this.$self.data( "remove" );
		if ( removeCharList ) {
			if ( typeof removeCharList === "number" ) {
				removeCharList = [ removeCharList ];
			} else {
				removeCharList = removeCharList.split( "," );
				removeCharList = removeCharList.map( this.convertToRemove.bind( this ) );
				this.characterThatNeedToBeRemoved = removeCharList.reduce( this.getSumOfRemovals );

			}
			this.removeCharList = removeCharList;
		} else {
			this.removeCharList = [];
		}

		if ( this.inlineList ) {
			this.deletedCharacters = 0;
			this.inlineList.forEach( this.convertInlineElements.bind( this ) );
		}
	}

	Span.prototype.convertInlineElements = function ( inline ) {
		
		if ( inline.delay ) {
			var i = inline.length + 1;
			while ( i -= 1 ) {
				if ( inline.isDel ) {
					this.delayList[ inline.pos + inline.length + this.deletedCharacters + i - 1 ] = inline.delay;
				} else {
					this.delayList[ inline.pos + this.deletedCharacters + i - 1 ] = inline.delay;
				}
			}
		}

		if ( inline.delayList ) {
			var i = 0;
			while ( i < inline.delayList.length ) {
				if ( inline.delayList[ i ] !== undefined ) {
					this.delayList[ inline.pos + this.deletedCharacters + i ] = inline.delayList[ i ];
				}
				i += 1;
			}
		}

		if ( inline.delayEnd ) {
			this.delayList[ inline.pos + inline.length + this.deletedCharacters ] = inline.delayEnd;
		}

		if ( inline.isDel ) {
			this.removeCharList[ inline.pos + inline.length ] = -inline.length;
			this.deletedCharacters += inline.length;
		}		
	}

	Span.prototype.checkForInlineElements = function ( nr, element ) {
		var $element = $( element );

		// check if element is a DEL
		if ( $element.is( "del" ) || $element.is( "span" ) ) {
			this.getPosAndLength( $element );
			$element.contents().unwrap();
		} else {
			this.displayChildrenError( 0, $element );
		}
	}

	Span.prototype.getChildren = function () {
		var innerClasses = [ "inner" ],
			$children = this.$self.children();

		// Check if any unallowed elements are in this
		// If there are dels, remove them and save their position and size
		if ( $children.length > 0 ) {
			this.inlineList = [];
			$children.each( this.checkForInlineElements.bind( this ) );			
		}

		// check for a right justified class
		if ( this.$self.is(".tr0,.tr1,.tr2,.tr3,.tr4,.tr5,.tr6,.tr7,.tr8,.tr9,.tr10,.tr11,.tr12") ) {
			this.rightJustified  = true;
			innerClasses.push( "right" );
		}

		this.fullTextContent = this.$self.html();

		this.characterCount = this.fullTextContent.length + ( this.characterThatNeedToBeRemoved || 0 );

		// put content in div;
		this.$innerSelf = $( "<span>", {
			html: this.fullTextContent,
			class: innerClasses.join( " " )
		});

		this.$currentCharWrapper = $( "<span>" );

		// remove normal content and replace it with the new wrapped content
		this.$self.html( this.$innerSelf );


		if ( this.rightJustified ) {
			this.$innerSelf.css( "width", ( 100 * this.$innerSelf.width() / this.$self.width() ) + "%" );
		} else {
			this.$self.css( "min-width", ( 100 * this.$self.width() / this.parent.$self.width() ) + "%" );
		}
	}

	Span.prototype.reveal = function () {
		if ( this.currentChar < this.characterCount  ) {
			var removesChar;
			// check if there is a list of characters that should be removed and then check if this character should be removed
			if ( this.removeCharList ) {
				removesChar = this.removeCharList[ this.currentChar ] < 0;
			}

			if ( removesChar ) {
				this.removeCharList[ this.currentChar ] += 1;
				this.fullTextContent = this.fullTextContent.substr( 0, this.absChars - 1 ) + this.fullTextContent.substr( this.absChars );
				this.absChars -= 1;
			} else {
				this.currentChar += 1;
				this.absChars += 1;

				var nextChar = this.fullTextContent.substr( this.currentChar - 1, 1 );
				if ( nextChar.search( /([\uD800-\uDBFF])/ ) >= 0 ) {
					this.currentChar += 1;
					this.absChars += 1;
				}
			}

			this.totalChars += 1;
			this.$currentCharWrapper.html( this.fullTextContent.substr( 0, this.absChars ) );

			cursor.moveToElement( this.$currentCharWrapper, true );

			timerController.addTimeout( this.reveal.bind( this ), this.getDelay() );
		} else {
			if( this.parentCallbackAfterReveal ) {
				this.parentCallbackAfterReveal();
			}
		}
	}

	Span.prototype.convertToDelay = function ( nr, b ) {
		var nr = parseInt( nr );

		if ( isNaN( nr ) ) { return; } 
		else { return nr; }
	}

	Span.prototype.convertToRemove = function ( nr, b ) {
		var nr = parseInt( nr );

		if ( isNaN( nr ) ) { return 0; } 
		else { return nr; }
	}

	Span.prototype.getSumOfRemovals = function ( prev, current ) {
		return prev - current;
	}

	return Span;
} );
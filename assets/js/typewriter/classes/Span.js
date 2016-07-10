define( [
	"helper/globals",
	"typewriter/classes/ParentTypeElement",
	"cursor/cursor",
	"voices/voices",
	"timer/controller"
	], function ( _globals, ParentTypeElement, cursor, voices, timerController ) {

	function Span( nr, self, prev, parent ) {
		this.basicSetup( nr, self, prev, parent );

		this.voice = this.parent.$self.hasClass( "v2" ) ? 1 : 0;
	}

	Span.prototype = Object.create( ParentTypeElement.prototype );
	Span.prototype.constructor = Span;

	Span.prototype.name = "Span";
	Span.prototype.elementName = "span";
	Span.prototype.possibleChildElements = [
		{
			elementName: "character"
		},
		{
			elementName: "del"
		},
		{
			elementName: "span"
		}
	];
	Span.prototype.isElement = true;
	Span.prototype.defaultDelay = _globals.defaultDelay || 50;
	Span.prototype.typeingForward = true;

	Span.prototype.getPosAndLength = function ( $element ) {
		var element = $element[ 0 ],
			length = $element.text()
			.length,
			pos = 0;

		while ( ( element = element.previousSibling ) ) {
			pos += element.length;
		}

		this.inlineList.push( {
			length: length,
			pos: pos,
			isDel: $element.is( "del" ),
			delay: $element.data( "delay" ),
			delayEnd: $element.data( "delayend" ),
			delayList: this.getDelayList( $element )
		} );
	};

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
	};

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
		} else {
			removeCharList = [];
		}

		return removeCharList;
	};

	Span.prototype.convertInlineElements = function ( inline ) {
		var i;
		if ( inline.delay ) {
			i = inline.length + 1;
			while ( ( i -= 1 ) ) {
				if ( inline.isDel ) {
					this.delayList[ inline.pos + inline.length + this.deletedCharacters + i - 1 ] = inline.delay;
				} else {
					this.delayList[ inline.pos + this.deletedCharacters + i - 1 ] = inline.delay;
				}
			}
		}

		if ( inline.delayList ) {
			i = 0;
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
	};

	Span.prototype.checkForInlineElements = function ( nr, element ) {
		var $element = $( element );

		// check if element is a DEL
		if ( $element.is( "del" ) || $element.is( "span" ) ) {
			this.getPosAndLength( $element );
			$element.contents()
				.unwrap();
		} else {
			this.displayChildrenError( 0, $element );
		}
	};

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
		if ( this.$self.is( ".tr0,.tr1,.tr2,.tr3,.tr4,.tr5,.tr6,.tr7,.tr8,.tr9,.tr10,.tr11,.tr12" ) ) {
			this.rightJustified = true;
			innerClasses.push( "right" );
		}

		this.fullTextContent = this.$self.html();

		if ( this.fullTextContent.length === 0 ) {
			this.displayEmptyElementError( true );
		}

		// put content in div;
		this.$innerSelf = $( "<span>", {
			class: innerClasses.join( " " )
		} );

		this.$currentCharWrapper = $( "<span>" );
		this.$innerSelf.append( this.$currentCharWrapper );

		// remove normal content and replace it with the new wrapped content
		this.$self.html( this.$innerSelf );

		this.removeCharList = this.getRemoveCharList();
		this.delayList = this.getDelayList( this.$self );

		if ( this.inlineList ) {
			this.deletedCharacters = 0;
			this.inlineList.forEach( this.convertInlineElements.bind( this ) );
		}

		this.childList = this.getCharacterList();

		this.$currentCharWrapper.html( this.childList[ this.childList.length - 1 ].text );

		if ( this.rightJustified ) {
			this.$innerSelf.css( "width", ( 100 * this.$innerSelf.width() / this.$self.width() ) + "%" );
		} else {
			this.$self.css( "min-width", ( 100 * this.$self.width() / this.parent.$self.width() ) + "%" );
		}

		if ( !_globals.noAnimation ) {
			this.$currentCharWrapper.html( "" );
		}

	};

	Span.prototype.getCharacterList = function () {
		var currentChar = 0,
			totalChars = 0,
			absChars = 0,
			currentFullText = this.fullTextContent,
			characterCount = currentFullText.length + ( this.characterThatNeedToBeRemoved || 0 ),
			childList = [],
			delayEnd = this.$self.data( "delayend" );

		function getDelay() {
			var delay;

			if ( delayEnd && currentChar === characterCount ) {
				delay = delayEnd;
			} else if ( this.delayList && this.delayList.length > totalChars ) {
				delay = this.delayList[ totalChars ] || this.delay;
			} else {
				delay = this.randomize( this.delay, 0.25, 4 );
			}

			return delay;
		}

		while ( currentChar < characterCount ) {
			// check if there is a list of characters that should be removed and then check if this character should be removed
			if ( this.removeCharList && this.removeCharList[ currentChar ] < 0 ) {
				this.removeCharList[ currentChar ] += 1;
				currentFullText = currentFullText.substr( 0, absChars - 1 ) + currentFullText.substr( absChars );
				absChars -= 1;
			} else {
				currentChar += 1;
				absChars += 1;

				var nextChar = currentFullText.substr( currentChar - 1, 1 );
				if ( nextChar.search( /([\uD800-\uDBFF])/ ) >= 0 ) {
					this.currentChar += 1;
					absChars += 1;
				}
			}

			childList.push( {
				text: currentFullText.substr( 0, absChars ),
				delay: getDelay.bind( this )()
			} );

			totalChars += 1;
		}

		return childList;
	};

	Span.prototype.revealChild = function ( nr ) {
		var child = this.childList[ nr ];

		cursor.moveToElement( this.$currentCharWrapper, true );

		timerController.addTimeout( function () {
			this.$currentCharWrapper.html( child.text );
			this.reveal();
			cursor.moveToElement( this.$currentCharWrapper, true );
		}.bind( this ), child.delay, "reveal next char" + child.text );

		// timerController.addTimeout( this.reveal.bind( this ), child.delay, "reveal next char" + child.text );
	};

	Span.prototype.convertToDelay = function ( nr ) {
		nr = parseInt( nr );

		if ( isNaN( nr ) ) {
			return;
		} else {
			return nr;
		}
	};

	Span.prototype.convertToRemove = function ( nr ) {
		nr = parseInt( nr );

		if ( isNaN( nr ) ) {
			return 0;
		} else {
			return nr;
		}
	};

	Span.prototype.getSumOfRemovals = function ( prev, current ) {
		return prev - current;
	};

	Span.prototype.resetChildren = function () {

	};

	return Span;
} );

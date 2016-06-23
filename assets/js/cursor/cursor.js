define( [ "helper/cache", "timer/controller" ], function ( _cache, timerController ) {
	function Cursor () {
		this.createCursorElement();
	}

	Cursor.prototype.createCursorElement = function () {
		this.$innerCursor = $( "<div/>", { "class" : "inner-cursor" } );
		this.$outerCursor = $( "<div/>", { "class" : "outer-cursor" } );

		this.$outerCursor.append( this.$innerCursor );

		_cache.$main.append( this.$outerCursor );
	}

	Cursor.prototype.setToIdle = function () {
		this.$outerCursor.addClass( "idle" );
	}

	Cursor.prototype.afterMove = function () {
		this.$outerCursor.removeClass( "idle" );

		timerController.removeTimeout( this.currentTimeOut );
		this.currentTimeOut = timerController.addTimeoutThatDoesntPause( this.setToIdle.bind( this ), 100 );
	}

	Cursor.prototype.updatePosition = function () {
		var $currentElement = this.currentElement.$self,
			currentElementPosition = $currentElement.offset(),
			currentElementWidth = this.currentElement.checkIfCursorToTheRight() ? $currentElement.width() : 0,
			left = currentElementPosition.left + currentElementWidth,
			top = currentElementPosition.top;

		this.$outerCursor.css( {
			left: left,
			top: top,
			//width: this.currentElement.next && this.currentElement.next.cursorToTheRight ? this.currentElement.next.$self.width() : ""
		} );

		if ( ! ( this.currentLeft === left && this.currentTop === top ) ) {
			this.afterMove();
		}	

		this.currentLeft = left;
		this.currentTop = top;
	}

	Cursor.prototype.moveToElement = function ( element ) {
		this.currentElement = element.getElementToMoveTo();
		this.updatePosition();
	}

	return new Cursor();
} );
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
		var currentElementOffset = this.$currentElement.offset(),
			currentElementWidth = this.currentlyIsAdding ? this.$currentElement.width() : 0,
			left = currentElementOffset.left + currentElementWidth,
			top = currentElementOffset.top;

		this.$outerCursor.css( {
			left: left,
			top: top,
			height: this.$currentElement.height() || this.$currentElement.parent().height() || undefined
		} );

		if ( ! ( this.currentLeft === left && this.currentTop === top ) ) {
			this.afterMove();
		}	

		this.currentLeft = left;
		this.currentTop = top;
	}

	Cursor.prototype.moveToElement = function ( $element, isAdding ) {
		this.$currentElement = $element;
		this.currentlyIsAdding = isAdding;
		this.updatePosition();
	}

	return new Cursor();
} );
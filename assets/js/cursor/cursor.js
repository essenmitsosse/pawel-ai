define( [ "helper/cache", "helper/const", "timer/controller" ], function ( _cache, _const, timerController ) {
	function Cursor() {
		this.createCursorElement();
		this.cursorRatio = _const.cursorRatio || 0.5;
	}

	Cursor.prototype.createCursorElement = function () {
		this.$innerCursor = $( "<div/>", {
			"class": "inner-cursor"
		} );
		this.$outerCursor = $( "<div/>", {
			"class": "outer-cursor"
		} );

		this.$outerCursor.append( this.$innerCursor );

		_cache.$main.append( this.$outerCursor );
	};

	Cursor.prototype.setToIdle = function () {
		this.$outerCursor.addClass( "idle" );
	};

	Cursor.prototype.afterMove = function () {
		this.$outerCursor.removeClass( "idle" );

		timerController.removeTimeout( this.currentTimeOut );
		this.currentTimeOut = timerController.addTimeoutThatDoesntPause( this.setToIdle.bind( this ), 100, "start cursor blink" );
	};

	Cursor.prototype.moveToPosition = function ( left, top, height ) {
		this.$outerCursor.css( {
			left: left,
			top: top,
			height: height,
			width: height * this.cursorRatio
		} );

		if ( !( this.currentLeft === left && this.currentTop === top ) ) {
			this.afterMove();
		}

		this.currentLeft = left;
		this.currentTop = top;
	};

	Cursor.prototype.updatePosition = function () {
		var currentElementOffset = this.$currentElement.offset(),
			currentElementWidth = this.currentlyIsAdding ? this.$currentElement.width() : 0,
			left = currentElementOffset.left + currentElementWidth,
			top = currentElementOffset.top,
			height = this.$currentElement.height() || this.$currentElement.parent()
			.height() || undefined;

		this.moveToPosition( left, top, height );
	};

	Cursor.prototype.moveToElement = function ( $element, isAdding ) {
		this.$currentElement = $element;
		this.currentlyIsAdding = isAdding;
		this.updatePosition();
	};

	Cursor.prototype.remove = function () {
		this.moveToPosition( -1000, -1000, 0 );
	};

	return new Cursor();
} );

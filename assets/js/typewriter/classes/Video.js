define( [
	"helper/globals",
	"typewriter/classes/BasicTypeElement"
], function ( _globals, BasicTypeElement ) {
	function Video( nr, self, prev, parent ) {
		this.basicSetup( nr, self, prev, parent );

		this.isFinished = false;

		this.$self.on( "click", this.pause.bind( this ) );
		this.self.addEventListener( "timeupdate", this.progress.bind( this ), false );
	}

	Video.prototype = Object.create( BasicTypeElement.prototype );
	Video.prototype.constructor = Video;

	Video.prototype.name = "Video";
	Video.prototype.elementName = "video";
	Video.prototype.isElement = true;
	Video.prototype.defaultDelay = 50;

	Video.prototype.reveal = function () {
		this.self.play();
	};

	Video.prototype.progress = function () {
		this.self.playbackRate = _globals.typeSpeedMultiplyer;

		if ( this.self.duration === this.self.currentTime ) {
			this.finish();
		}
	};

	Video.prototype.pause = function () {
		this.self.pause();

		if ( !this.isFinished ) {
			this.finish();
		}
	};

	Video.prototype.parentCallbackAfterReveal = function () {
		this.isFinished = true;
	};

	Video.prototype.specialReset = function () {
		this.self.currentTime = 0;
	};

	return Video;
} );

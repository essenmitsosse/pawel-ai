/* global YT */
define( [
	"helper/globals",
	"typewriter/classes/BasicTypeElement",
	"helper/youtubeApi",
], function ( _globals, BasicTypeElement, youtubeApi ) {
	function IFrame( nr, self, prev, parent ) {
		this.basicSetup( nr, self, prev, parent );

		this.isFinished = false;
		this.youtubeUrl = this.$self.data( "video" );
		this.$self.attr( "id", this.youtubeUrl );

		youtubeApi.addVideo( this );

		// this.self.addEventListener( "timeupdate", this.progress.bind( this ), false );
	}

	IFrame.prototype = Object.create( BasicTypeElement.prototype );
	IFrame.prototype.constructor = IFrame;

	IFrame.prototype.name = "IFrame";
	IFrame.prototype.elementName = "video";
	IFrame.prototype.isElement = true;
	IFrame.prototype.defaultDelay = 50;

	IFrame.prototype.addPlayer = function () {
		this.player = new YT.Player( this.youtubeUrl, {
			"videoId": this.youtubeUrl,
			"playerVars": {
				"controls": 0,
				"showinfo": 0,
				"rel": 0
			},
			"events": {
				"onReady": this.onPlayerLoaded.bind( this ),
				"onStateChange": this.onStateChange.bind( this )
			}
		} );

		this.$self = $( "#" + this.youtubeUrl );
		this.self = this.$self[ 0 ];

		this.$self.removeAttr( "width" )
			.removeAttr( "height" );
	};

	IFrame.prototype.onPlayerLoaded = function () {
		this.playerLoaded = true;
	}

	IFrame.prototype.reveal = function () {
		this.player.playVideo();
	};

	IFrame.prototype.onStateChange = function ( event ) {
		// this.self.playbackRate = _globals.typeSpeedMultiplyer;

		if ( this.isReseting === true ) {
			this.isReseting = false;
			return;
		}

		if ( event.data === 0 ) {
			this.finishIFrame();
		}
	};

	IFrame.prototype.finishIFrame = function () {
		if ( !this.isFinished ) {
			this.finish();
			this.isFinished = true;
		}
	};

	IFrame.prototype.specialReset = function () {
		this.isFinished = false;
		if ( this.playerLoaded ) {
			this.isReseting = true;
			this.player.seekTo( 0 );
			this.player.pauseVideo();
		}
	};

	return IFrame;
} );

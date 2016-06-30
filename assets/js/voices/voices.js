define( [ "helper/cache", "helper/const", "timer/controller" ], function ( _cache, _const, timerController ) {
	var Voice = function ( nr, pos ) {
			this.nr = nr;
			this.pos = pos;

			this.$voiceWrap = $( "<div/>", { "class" : "voice-wrap", "id": "voice-" + nr } );
			this.$voiceBox = $( "<div/>", { "class" : "voice-box" } );

			this.$voiceWrap.append( this.$voiceBox );

			this.createDots( this.$voiceWrap );

			_cache.$main.append( this.$voiceWrap );
		},
		voices;

	Voice.prototype.createDots = function ( $wrap ) {
		var i = 3;

		while ( i ) {
			$wrap.append( this.createDot( i ) );
			i -= 1;
		}
	}

	Voice.prototype.createDot = function ( nr ) {
		this.$voiceDotOuter = $( "<div/>", { "class" : "voice-dot voice-dot-" + nr } );
		this.$voiceDotInner = $( "<div/>", { "class" : "voice-dot-inner" } );

		this.$voiceDotOuter.append( this.$voiceDotInner );

		return this.$voiceDotOuter;
	}

	Voice.prototype.silence = function () {
		this.$voiceWrap.removeClass( "speaking" );
	}

	Voice.prototype.refresh = function () {
		this.$voiceWrap.addClass( "speaking" );
		timerController.removeTimeout( this.currentTimeOut );
		this.currentTimeOut = timerController.addTimeoutThatDoesntPause( this.silence.bind( this ), 500 );
	}

	voices = [
		new Voice( 1, "left" ),
		new Voice( 2, "right" )
	];

	function refreshVoice ( voiceNr ) {
		voices[ voiceNr ].refresh();
	}

	return {
		refreshVoice: refreshVoice
	};
} );
define( [
	"helper/cache"
], function ( _cache ) {
	function PlayPause( $menuIconWrapper ) {
		this.name = "playpause";
		this.$menuIcon = $( "<div/>", {
				class: "menuIcon icon-" + this.name,
			} )
			.on( "click", this.togglePlayPause.bind( this ) )
			.appendTo( $menuIconWrapper );
	}

	PlayPause.prototype.togglePlayPause = function () {
		require( "timer/controller" )
			.toggleAllTimeouts();
	};

	return PlayPause;
} );

define( [], function () {
	var tag = document.createElement( 'script' ),
		firstScriptTag = document.getElementsByTagName( 'script' )[ 0 ],
		player,
		videoList = [],
		apiIsReady = false;

	tag.src = "https://www.youtube.com/iframe_api";
	firstScriptTag.parentNode.insertBefore( tag, firstScriptTag );

	function onYouTubeIframeAPIReady() {
		apiIsReady = true;
		videoList.forEach( addPlayerToVideo );
	}

	function onPlayerReady( event ) {}

	window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
	window.onPlayerReady = onPlayerReady;

	function addPlayerToVideo( video ) {
		video.addPlayer();
	}

	function addVideo( video ) {
		if ( apiIsReady ) {
			addPlayerToVideo( video );
		} else {
			videoList.push( video );
		}
	}

	return {
		addVideo: addVideo
	}
} );

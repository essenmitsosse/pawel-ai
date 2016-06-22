define( [ "helper/cache" ], function ( _cache ) {
	var grids = _cache.gridCount,
		$debugWrapper = $( "<div/>", { id: "debug-wrapper" } ),
		$innerGridWrapper = $( "<div/>", { class: "inner-grid-wrapper" } ),
		i = 0;

	function createGridLine ( nr ) {
		$gridLine = $( "<div/>", {
			class: [ "grid-line", "grid-line-" + nr ].join( " " )
		} );

		$gridLine.appendTo( $innerGridWrapper );
	}

	while ( i <= grids ) {
		createGridLine( i );
		i += 1;
	}

	$innerGridWrapper.appendTo( $debugWrapper );
	$debugWrapper.appendTo( _cache.$body );
} );

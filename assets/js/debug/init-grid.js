define( [ "helper/vars" ], function ( _vars ) {
	var grids = _vars.gridCount,
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
	$debugWrapper.appendTo( _vars.$body );
} );

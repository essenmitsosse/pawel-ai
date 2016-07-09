define( [
	"helper/cache",
	"helper/globals"
], function ( _cache, _globals ) {

	function MenuObject( self, $menuIconWrapper, hideAllMenuItems ) {
		this.self = self;
		this.$self = $( self );
		this.name = this.$self.data( "name" );
		this.$menuIcon = $( "<div/>", {
				class: "menuIcon icon-" + this.name,
			} )
			.on( "click", this.toggleVisibility.bind( this ) )
			.appendTo( $menuIconWrapper );

		this.visible = false;
		this.hideAllMenuItems = hideAllMenuItems;
	}

	MenuObject.prototype.toggleVisibility = function () {
		if ( this.visible ) {
			this.hideAllMenuItems();
		} else {
			this.hideAllMenuItems( this );
		}
	};

	MenuObject.prototype.show = function () {
		this.visible = true;
		this.$self.addClass( "show" );
		this.$menuIcon.addClass( "active" );
	};

	MenuObject.prototype.hide = function () {
		this.visible = false;
		this.$self.removeClass( "show" );
		this.$menuIcon.removeClass( "active" );
	};

	return MenuObject;
} );

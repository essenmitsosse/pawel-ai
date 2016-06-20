define( [ "typewriter/classes/BasicTypeElement", "debug/errorMessenger" ], function ( BasicTypeElement, errorMessenger ) {
	function Character ( args ) {
		this.basicSetup( args );

		this.$self = $( "<span class=\"c\">" + this.self + "</span>" );

		this.parent.addNewChildToList( this.$self );
	}

	Character.prototype = Object.create( BasicTypeElement.prototype );
	Character.prototype.constructor = Character;
	Character.prototype.name = "Character";
	Character.prototype.elementName = "Single-Character";
	Character.prototype.hasChildren = false;
	Character.prototype.isElement = false;
	Character.prototype.defaultDelay = 50;

	return Character;
} );
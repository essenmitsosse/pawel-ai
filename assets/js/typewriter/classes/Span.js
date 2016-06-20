define( [ 
	"typewriter/classes/ParentTypeElement", 
	"typewriter/classes/Character", 
	"debug/errorMessenger" 
	], function ( ParentTypeElement, Character, errorMessenger ) {

	function Span ( nr, self, prev, parent ) {
		this.basicSetup( nr, self, prev, parent );
	}

	Span.prototype = Object.create( ParentTypeElement.prototype );
	Span.prototype.constructor = Span;

	Span.prototype.name = "Span";
	Span.prototype.elementName = "span";
	Span.prototype.possibleChildElements = [ 
		{ elementName: "character", ClassConstructor: Character } 
	];
	Span.prototype.isElement = true;
	Span.prototype.defaultDelay = 0;

	Span.prototype.beforeGetChildren = function () {
		if ( this.$self.children().length > 0 ) {
			this.displayChildrenError( 0, this.$self.children() );
		}

		this.$newChildrenList = $();
	}

	Span.prototype.afterGetChildren = function () {
		this.$self.html( "" );
		this.$self.append( this.$newChildrenList );
	}

	Span.prototype.addNewChildToList = function ( $newChild ) {
		this.$newChildrenList = this.$newChildrenList.add( $newChild );
	};

	Span.prototype.getChildrenList = function () {
		return $( this.$self.html().split( "" ) );
	}

	Span.prototype.childrenFactory = function ( nr, character ) {
		this.addNewChild( Character, nr, character );
	}

	return Span;
} );
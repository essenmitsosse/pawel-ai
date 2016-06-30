define( [ "typewriter/classes/BasicTypeElement", "helper/errorMessenger" ], function ( BasicTypeElement, errorMessenger ) {

	function ParentTypeElement () {
	};

	ParentTypeElement.prototype = Object.create( BasicTypeElement.prototype );
	ParentTypeElement.prototype.constructor = ParentTypeElement;

	ParentTypeElement.prototype.hasChildren = true;
	ParentTypeElement.prototype.name = "ParentTypeElement";
	ParentTypeElement.prototype.possibleChildElements = [];

	ParentTypeElement.prototype.getChildrenList = function () {
		return this.$self.children();
	}

	ParentTypeElement.prototype.getChildren = function () {
		var $children = this.getChildrenList();

		this.childList = [];
		
		if ( this.beforeGetChildren ) { this.beforeGetChildren(); }			

		$children.each( this.childrenFactory.bind( this ) );

		if ( this.afterGetChildren ) { this.afterGetChildren(); }
	};

	ParentTypeElement.prototype.addNewChild = function ( ClassConstructor, nr, childElement ) {
		var args = {
				nr: nr, 
				self: childElement, 
				parent: this,
				prev: this.childList[ this.childList.length - 1 ] || false,
				delay: this.delay
			},
			newChild = new ClassConstructor( args );

		this.childList.push( newChild );
	}

	ParentTypeElement.prototype.childrenFactory =  function ( nr, childElement ) {
		var $childElement = $( childElement ),
			ClassConstructor = this.checkIfElementIsPossibleChildElement( $childElement );

		if( ClassConstructor ) {
			this.addNewChild( ClassConstructor, nr, childElement );
		} else {
			this.displayChildrenError( nr, $childElement );
		}
	};

	// loops through the list of possible elements and compares them to the current $childElement
	// returns the constructor for that child element if it is a match
	// returns false if there is no match
	ParentTypeElement.prototype.checkIfElementIsPossibleChildElement = function ( $childElement ) {
		return this.possibleChildElements.reduce( function ( prevElement, currentElement ) {
			return $childElement.is( currentElement.elementName ) ?
				currentElement.ClassConstructor
				: prevElement;
		}, false );
	};

	ParentTypeElement.prototype.displayEmptyElementError = function ( markParent ) {
		var errorMessage = [];

		errorMessage.push( "There is an empty element which is supposed to have children." );
		errorMessage.push( "- element is a: " + this.$self.prop( "nodeName" ) );
		

		this.giveLocationInformationAboutFaultyElement( errorMessage );

		errorMessenger.markErrorElement( this.$self, markParent ? this.parent.$self : false );
	}

	ParentTypeElement.prototype.displayChildrenError = function( nr, $childElement ) {
		var possibleChildElementsNames = [],
			errorMessage = [],
			neitherNor = this.possibleChildElements.length > 1 ? "neither" : "not";

		this.possibleChildElements.forEach( function ( possibleElement, nr ) {
			possibleChildElementsNames.push( possibleElement.elementName.toUpperCase() );
		} );

		errorMessage.push( "There is an element that is " + neitherNor + " a " + possibleChildElementsNames.join( " nor a " ) + " as a direct child of a " + this.elementName.toUpperCase() + "." );
		errorMessage.push( "- element is a: " + $childElement.prop( "nodeName" ) );
		errorMessage.push( "- element should be: " + possibleChildElementsNames.join( " or " ) );
		errorMessage.push( "- position: #" + nr );

		this.giveLocationInformationAboutFaultyElement( errorMessage );

		errorMessenger.markErrorElement( $childElement, this.$self );
	};

	ParentTypeElement.prototype.giveLocationInformationAboutFaultyElement = function ( errorMessage ) {
		var parent = this;

		while ( parent ) {
			errorMessage.push( "- " + parent.elementName.toUpperCase() + ": #" + ( parent.nr + 1 )  );
			parent = parent.parent;
		}
		errorMessenger.sendMessage( errorMessage );
	}

	ParentTypeElement.prototype.reveal = function () {
		if ( this.currentChild < this.childList.length ) {
			var currentChild = this.childList[ this.currentChild ];
			this.currentChild += 1;	

			currentChild.startReveal( this.reveal.bind( this ) );		
		} else {
			this.afterReveal();
		}
	}

	ParentTypeElement.prototype.resetChildren = function () {
		if ( this.childList.length >  0 ) {
			this.childList.forEach( this.resetChild );
		}		
	}

	ParentTypeElement.prototype.resetChild = function ( child ) {
		child.reset();
	}

	return ParentTypeElement;
} );

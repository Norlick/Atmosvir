var GAME = GAME || {};
GAME.eID = {};

GAME.EntityManager = {};
( function() {
	'use strict';

	var i = 0, x = 0,

		total_entities = 0 |0;

	// ENTITY EVENTS -----------------------------------------------------------

	function EntityChangedEvent( id ) {
		this.id = id;
	}
	EntityChangedEvent.prototype.name = 'entityChanged';

	// ENTITY PROTOTYPE --------------------------------------------------------

	function Entity( c ) {
		this.id = ( 1e4 + Math.random() * 9e4 |0 ) * 1e3 + total_entities++ |0;

		if ( c !== undefined ) this.add( c );

		GAME.eID[ this.id ] = this;
	}
	Entity.prototype = {

		add : function( cmpnt ) {
			// Let c be an array if it isn't already
			let c = ( Array.isArray(cmpnt) ) ? cmpnt : [ cmpnt ];
			for ( x=0; x < c.length; x++ ) {
				this[ c[x].name ] = c[x];
			}
			// Notify processors that the entity has changed
			GAME.EventManager.send( new EntityChangedEvent( this.id ) );
		},

		remove : function( cmpnt ) {
			// Let c be an array if it isn't already
			let c = ( Array.isArray(cmpnt) ) ? cmpnt : [ cmpnt ];
			for ( x=0; x<c.length; x++ ) {
				if ( this[ c[x] ] !== undefined ) {
					delete this[ c[x] ];
				}
			}
			// Notify processors that the Entity has changed
			GAME.EventManager.send( new EntityChangedEvent( this.id ) );
		},

		has : function( cmpnt ) {
			// Let c be an array if it isn't already
			let c = ( Array.isArray(cmpnt) ) ? cmpnt : [ cmpnt ];
			for ( x=0; x<c.length; x++ ) {
				if ( this[ c[x] ] === undefined ) {
					return false;
				}
			}
			return true;
		},

		destroy : function() {
			// TODO testing
			let keys = Object.keys( this );
			this.remove( keys );
			GAME.EventManager.send( new EntityChangedEvent( this.id ) );
			delete GAME.eID[this.id];
		}

	};

	//--------------------------------------------------------------------------

	// Create an entity with the supplied components
	this.create = function create( c ) {
		return new Entity( c ).id;
	};

	// Returns an array of entities with the supplied components
	this.get = function get( c ) {};

} ).call( GAME.EntityManager );

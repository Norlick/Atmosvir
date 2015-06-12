function MapProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, { name : 'Map' } );

	//--------------------------------------------------------------------------

	var rooms = {};

	//--------------------------------------------------------------------------

	this.events.init = function( e ) {
		console.log( JSON.stringify( e.data, null, 4 ) );
	};

	this.events.reset = function( e ) {};

	this.events.goToRoom = function( e ) {};

}

function MapProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, { name : 'Map' } );

	//--------------------------------------------------------------------------

	var rooms = {};

	//--------------------------------------------------------------------------

	this.events.load = function( e ) {
		GAME.Util.loadJSON( e.url, function( opt ) {} );
	};

	this.events.reset = function( e ) {};

	this.events.goToRoom = function( e ) {};

}

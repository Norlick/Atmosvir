function PlayerProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'Player',
		watch : [ 'player', 'actor' ]
	} );

	//--------------------------------------------------------------------------

		// Flags
	var	inputEnabled	= false,
		playerAcquired	= false,

		// Pointer to player entity
		PlayerActor		= null,

		// Processed player inputs
		controls = {
			x_move	: +( 0.0 ),	// -1.0 <- 0.0 -> 1.0
			y_move	: +( 0.0 ),	// -1.0 <- 0.0 -> 1.0
			speed	: +( 0.0 )	//  0.0 -> 1.0
		};

	//--------------------------------------------------------------------------

	this.processAddEntity = function( id ) {
		if ( playerAcquired ) {
			console.error( 'Cannot acquire more than one player actor!' );
		} else {
			PlayerActor		= GAME.eID[ id ];
			playerAcquired	= true;
		}
	};

	this.processRmvEntity = function( id ) {
		playerAcquired	= false;
		PlayerActor		= null;
	};

	//--------------------------------------------------------------------------

	this.update = function update() {
		if ( inputEnabled && playerAcquired ) {
			// Control player actor
			console.log( this.entities[0] );
		}
	};

	//--------------------------------------------------------------------------

}

function PlayerComponent( opt ) {

	'use strict';

	var opt = opt || {};

}
PlayerComponent.prototype.name = 'player';

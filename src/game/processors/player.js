function PlayerProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'Player',
		watch : [ 'player', 'actor' ]
	} );

}

function PlayerComponent( opt ) {

	'use strict';

	var opt = opt || {};

}
PlayerComponent.prototype.name = 'player';

function ActorProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'Actor',
		watch : 'actor'
	} );

	//--------------------------------------------------------------------------

	this.update = function() {};

}

function ActorComponent( opt ) {

	'use strict';

	var opt = opt || {};

}
ActorComponent.prototype.name = 'actor';

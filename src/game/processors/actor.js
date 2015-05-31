function ActorProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'Actor',
		watch : 'actor'
	} );

	//--------------------------------------------------------------------------

	var i = 0;

	//--------------------------------------------------------------------------

	this.update = function() {};

}

function ActorComponent( opt ) {

	'use strict';

	var opt = opt || {};

}
ActorComponent.prototype.name = 'actor';

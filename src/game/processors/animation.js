function AnimationProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'Animation',
		watch : [ 'animation', 'object3d' ]
	} );

	//--------------------------------------------------------------------------

	this.processAddEntity = function( id ) {};
	this.processRmvEntity = function( id ) {};

	//--------------------------------------------------------------------------

	this.update = function() {};

}

function AnimationComponent( opt ) {

	'use strict';

	var opt = opt || {};

}
AnimationComponent.prototype.name = 'animation';

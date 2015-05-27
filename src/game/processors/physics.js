function PhysicsProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'Physics',
		watch : [ 'physics', 'object3d' ]
	} );

	//--------------------------------------------------------------------------

	var Obj3D = GAME.World.getObj3D(),
		PhysicsWorker = null;

	//--------------------------------------------------------------------------

	this.onStart = function() {
		console.log( 'Started PhysicsWorker' );
	};
	this.onStop = function() {};

	//--------------------------------------------------------------------------

	this.processAddEntity = function( id ) {};
	this.processRmvEntity = function( id ) {};

	//--------------------------------------------------------------------------

	this.update = function() {
		console.log('Physics Update');
	};

}

function PhysicsComponent( opt ) {

	'use strict';

	var opt = opt || {};

	this.isDynamic	= opt.isDynamic || false;

	this.type		= opt.type || 'box';
	this.size		= opt.size || [ 1,1,1 ];
	this.mass		= opt.mass || 0;

}
PhysicsComponent.prototype.name = 'physics';

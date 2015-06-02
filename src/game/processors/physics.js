function PhysicsProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'Physics',
		watch : [ 'physics', 'object3d' ]
	} );

	//--------------------------------------------------------------------------

	var eID		= GAME.eID,
		Obj3D	= GAME.World.getObj3D(),
		PhysicsWorker = null,

		elist	= null,
		m		= null,
		mj		= null,
		_update = false; // Should we update positions?

	function getmessage( e ) {
		if ( typeof e.data.log !== 'undefined' ) {
			console.log( 'PhysicsWorker: %s', e.data.log );
		}

		// GET PHYSICS UPDATE
		if ( e.data.msg === 'update' ) {
			_update = true;

			elist	= e.data.entities;
			m		= e.data.matrix;
			mj 		= e.data.matrixjoint;
		}
	}

	PhysicsWorker = new Worker( 'src/game/workers/physics.js' );
	PhysicsWorker.onmessage = getmessage;

	//--------------------------------------------------------------------------

	this.processAddEntity = function( id ) {
		PhysicsWorker.postMessage({ cmd:'addEntity', entity:eID[ id ] });
	};
	this.processRmvEntity = function( id ) {
		PhysicsWorker.postMessage({ cmd:'rmvEntity', id:id });
	};

	//--------------------------------------------------------------------------

	this.update = function() {
		if ( _update ) {
			// Update body matrixes
		}
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

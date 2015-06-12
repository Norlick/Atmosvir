/*
___ TODO _______________________________________________________________________
	~ Transmit Actor movement velocity data
	~ Decide how to calculate actor movement velocity -- main or physics thread?
	~ Synchronize timestep on worker with main thread Delta
------------------------------------------------------------------------------*/

function PhysicsProcessor() {

	'use strict';

	// TODO: Use TypedArrays 'cuz Garbage Collector is an asshole.

	GAME.ProcessController.construct( this, {
		name : 'Physics',
		watch : [ 'physics', 'object3d' ]
	} );

	//--------------------------------------------------------------------------

	var	i = 0, x = 0, n = 0,

		eID		= GAME.eID,
		Obj3D	= GAME.World.getObj3D(),
		PhysicsWorker = null,

		// Update objects
		_m		= new THREE.Matrix4(),

		elist	= [], // Index of eID's on the worker
		actors	= {}, // Indexed by eID
		mtx		= {}, // Indexed by eID
		mj		= {},
		_update = false; // Should we update positions?

	//--------------------------------------------------------------------------

	function getmessage( e ) {
		if ( typeof e.data.log !== 'undefined' ) {
			console.log( 'PhysicsWorker: %s', e.data.log );
		}

		// GET PHYSICS UPDATE
		if ( e.data.msg === 'update' ) {
			_update = true;

			elist	= e.data.entities;
			mtx		= e.data.matrix;
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

			_update = false;
			PhysicsWorker.postMessage( { cmd:'update' } );

			// Update body matrixes
			//console.log(m, elist);
			for ( i=0; i !== elist.length; i++ ) {
				x = elist[ i ];
				console.log( x, mtx[x] );
				Obj3D[ x ].applyMatrix( _m.fromArray( mtx[ x ] ) );
				//Obj3D[ x ].matrixWorld.fromArray( mtx[ x ] );
			}

		}
	};

	PhysicsWorker.postMessage( { cmd:'update' } );

	//--------------------------------------------------------------------------
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

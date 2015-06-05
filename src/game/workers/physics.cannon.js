'use strict';

// -----------------------------------------------------------------------------
importScripts( 'cannon.min.js' ); // Cannon.js
// -----------------------------------------------------------------------------

var i = 0|0, e = 0|0,
	dt = 1/60, iterations = 8, gravity = -9.8,
	timestep	= dt * 1000,
	wakeup		= false,

	entities	= [],
	terrain		= null, // Plane with heightmap
	statics		= [],

	actors		= {}, // Indexed by eID
	bodies		= {}, // Indexed by eID
	mtx			= {}, // Indexed by eID
	joints		= [],
	matrixjoint	= [],

	// World init
	world					= new CANNON.World();
	world.broadphase		= new CANNON.NaiveBroadphase();
	world.solver.tolerance	= 0.001;
	world.solver.iterations	= 8;
	world.gravity.set( 0, gravity, 0 )

	// Default physics material
	world.defaultContactMaterial.contactEquationStiffness = 1e8;
	world.defaultContactMaterial.contactEquationRegularizationTime = 3;

// -----------------------------------------------------------------------------

/*
____Actor body _________________________________________________________________
 ***EXPERIMENTAL***
	http://lo-th.github.io/Oimo.js/js/oimo/vehicle/player.js				  */
function ActorBody( id, opt ) {

	this.id	= id;

//	this.speed		= 0.2;
	this.phi		= 0;
	this.position	= opt.position || [ 0, 0, 0 ];

	this.body = new CANNON.Body({ mass:2 });

	bodies[ id ] = this.body;
	actors[ id ] = this;

}
ActorBody.prototype = {
	move : function( v ) {}
};

self.postMessage({ log:'Initialized Physics Worker' });


self.onmessage = function( e ) {

	switch( e.data.cmd ) {


		// UPDATE the world and send data to main thread -----------------------
		case 'update':

			// Step world
			world.step();

			i		= entities.length;
			wakeup	= false;

			// Body Matrixes
			while ( i-- ) {
				var e = entities[ i ];
				if ( wakeup ) bodies[ e ].awake();
				mtx[ e ] = bodies[ e ].getMatrix();
			}

			// Joint Matrixes
			i = joints.length;
			while ( i-- ) {
				matrixjoint[ i ] = joints[ i ].getMatrix();
			}

			// Collisions
			if ( world.checkContact( 'actor', 'actor' ) ) {}

			// Send the data
			self.postMessage( {
				msg: 'update',
				entities: entities,
				matrix: mtx,
				matrixjoint: matrixjoint
			} );

			break;


		// ADD ENTITY and its physics body -------------------------------------
		case 'addEntity':
			break;


		// REMOVE ENTITY and its physics body ----------------------------------
		case 'rmvEntity':
			break;


		// ADD JOINT
		case 'addJoint':
			self.postMessage( { log: 'addJoint Not yet implemented' } );
			break;


		case 'createStaticCollider':
			self.postMessage( { log: 'Created static collider.' } );
			break;


		case 'initWorld':
			self.postMessage( { log: 'Initializing Physics world.' } );
			break;


		case 'clear':
			self.postMessage( { log: 'Clearing physics world.' } );
			break;

	}

};

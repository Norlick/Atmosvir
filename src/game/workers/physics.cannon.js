'use strict';

// -----------------------------------------------------------------------------
importScripts( 'cannon.min.js' ); // Cannon.js
// -----------------------------------------------------------------------------

var i = 0|0, e = 0|0,
	dt = 1/60, tolerance = 0.001, iterations = 8, gravity = -9.8,
	timestep	= dt * 1000,
	wakeup		= false,

	entities	= [],
	statics		= [], // Environment

	actors		= [], // eID index
	bodies		= {}, // Indexed by eID
	positions	= {}, // Indexed by eID
	quaternions	= {}, // Indexed by eID

	// World init
	world					= new CANNON.World();
	world.broadphase		= new CANNON.NaiveBroadphase();
	world.solver.tolerance	= tolerance;
	world.solver.iterations	= iterations;
	world.gravity.set( 0, gravity, 0 )

	// Default physics material
	world.defaultContactMaterial.contactEquationStiffness = 1e8;
	world.defaultContactMaterial.contactEquationRegularizationTime = 3;

// -----------------------------------------------------------------------------

/*
____Actor body _________________________________________________________________
 ***EXPERIMENTAL**															  */
function ActorBody( id, opt ) {

	this.id	= id;

	this.body = new CANNON.Body({
		allowSleep: false,
		mass: 2
	});

	bodies[ id ] = this.body;

}
ActorBody.prototype = {
	// See if it's better to process velocity on worker or physics processor
	move : function( x, y ) {
		this.body.velocity.x = x;
		this.body.velocity.z = z;
	}
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

			while( i-- ) {
				let b = bodies[ entities[i] ];
				positions[ entities[i] ]	= b.position.toArray();
				quaternions[ entities[i] ]	= b.quaternion.toArray();
			}

			// Collisions
			if ( world.checkContact( 'actor', 'actor' ) ) {}

			// Send the data
			self.postMessage( {
				msg: 'update',
				entities: entities,
				positions: positions,
				quaternions: quaternions
			} );

			break;


		// ADD ENTITY and its physics body -------------------------------------
		case 'addEntity':
			break;


		// REMOVE ENTITY and its physics body ----------------------------------
		case 'rmvEntity':
			break;

		case 'createStaticEventEmitter':
			break;

		case 'initMap':
			self.postMessage( { log: 'Initializing Static Map Geometry.' } );

			break;


		case 'clear':
			self.postMessage( { log: 'Clearing physics world.' } );
			break;

	}

};

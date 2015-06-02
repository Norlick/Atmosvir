// -----------------------------------------------------------------------------
importScripts( 'Oimo.rev.min.js' );
// Switch to Ammo.JS eventually
// -----------------------------------------------------------------------------

var dt = 1/60, iterations = 8, gravity = 9.8,
	timestep	= dt * 1000,

	entities	= [],
	ecount		= 0 |0,
	terrain		= null, // Plane with heightmap
	statics		= [],

	bodies		= {}, // Indexed by eID
	matrix		= {}, // Indexed by eID
	joints		= [],
	matrixjoint	= [],

	world = new OIMO.World( dt, 2, iterations );
	world.gravity.init( 0, gravity, 0 );

self.postMessage({ log:'Initialized Physics Worker' });


self.onmessage = function( e ) {

	switch( e.data.cmd ) {


		// UPDATE the world and send data to main thread -----------------------
		case 'update':

			// Step world
			world.step();

			var i		= entities.length,
				wakeup	= false;

			while ( i-- ) {
				var e = entities[ i ];
				if ( wakeup ) bodies[ e ].awake();
				matrix[ e ] = bodies[ e ].getMatrix();
			}

			i = joints.length;
			while ( i-- ) {
				matrixjoint[ i ] = joints[ i ].getMatrix();
			}

			self.postMessage( {
				msg: 'update',
				entities: entities,
				matrix: matrix,
				matrixjoint: matrixjoint
			} );

			break;


		// ADD ENTITY and its physics body -------------------------------------
		case 'addEntity':

			var id		= e.data.entity.id,
				p		= e.data.entity.physics,
				pos		= e.data.entity.object3d.position;

			entities.push( id );
			bodies[ id ] = new OIMO.Body( {
				type	: p.type,
				size	: p.size,
				pos		: [ pos.x, pos.y, pos.z ],
				move	: p.isDynamic,
				world	: world
			} );
			self.postMessage( { log: 'Added entity[ '+ id +' ]' } );

			break;


		// REMOVE ENTITY and its physics body ----------------------------------
		case 'rmvEntity':
			var entity	= e.data.id,
				e		= entities.indexOf( entity );
			( e === -1 ) || ( entities.splice( e, 1 ) );
			break;


		// ADD JOINT
		case 'addJoint':
			self.postMessage( { log: 'addJoint Not yet implemented' } );
			break;

		case 'createStaticCollider':
			statics.push( new OIMO.Body( {
				type	: e.data.params.type,
				size	: e.data.params.size,
				pos		: e.data.params.pos,
				move	: false,
				world	: world
			} ) );
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

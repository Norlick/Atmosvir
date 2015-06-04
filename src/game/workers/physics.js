'use strict';

// -----------------------------------------------------------------------------
importScripts( 'Oimo.rev.min.js' );
// Switch to Ammo.JS eventually
// -----------------------------------------------------------------------------

var i = 0|0, e = 0|0,
	dt = 1/60, iterations = 8, gravity = 9.8,
	timestep	= dt * 1000,
	wakeup		= false,

	entities	= [],
	ecount		= 0 |0,
	terrain		= null, // Plane with heightmap
	statics		= [],

	actors		= {}, // Indexed by eID
	bodies		= {}, // Indexed by eID
	mtx			= {}, // Indexed by eID
	joints		= [],
	matrixjoint	= [],

	world = new OIMO.World( dt, 2, iterations );
	world.gravity.init( 0, gravity, 0 );

/*
____Actor body _________________________________________________________________
 ***EXPERIMENTAL***
	http://lo-th.github.io/Oimo.js/js/oimo/vehicle/player.js				  */
function ActorBody( id, opt ) {

	this.id	= id;

	this.sc = new OIMO.ShapeConfig();
	this.sc.density		= opt.density || 1;
	this.sc.friction	= 0.0;
	this.sc.restitution	= 0.0;

//	this.speed		= 0.2;
	this.phi		= 0;
	this.position	= opt.position || [ 0, 0, 0 ];

	this.body = new OIMO.Body( {
		type	: 'sphere',
		size	: opt.size || [ 10,20,8 ],
		pos		: this.position,
		sc		: this.sc,
		move	: true,
		noSleep	: true
	} );

	bodies[ id ] = this.body;
	actors[ id ] = this;

}
ActorBody.prototype = {
	move : function( v ) {
		this.body.linearVelocity.x	= v.x;
		this.body.linearVelocity.y	= v.y;
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

			while ( i-- ) {
				var e = entities[ i ];
				if ( wakeup ) bodies[ e ].awake();
				mtx[ e ] = bodies[ e ].getMatrix();
			}

			i = joints.length;
			while ( i-- ) {
				matrixjoint[ i ] = joints[ i ].getMatrix();
			}

			self.postMessage( {
				msg: 'update',
				entities: entities,
				matrix: mtx,
				matrixjoint: matrixjoint
			} );

			break;


		// ADD ENTITY and its physics body -------------------------------------
		case 'addEntity':

			var id		= e.data.entity.id,
				p		= e.data.entity.physics;
			p.pos	= e.data.entity.object3d.position;

			entities.push( id );
			if ( p.type === 'actor' ) {
				new ActorBody( id, p );
			} else {
				bodies[ id ] = new OIMO.Body( {
					type	: p.type,
					size	: p.size,
					pos		: p.pos,
					move	: p.isDynamic,
					world	: world
				} );
			}

			mtx[ id ] = bodies[ id ].getMatrix();

			ecount++;
			self.postMessage( { log: 'Added entity[ '+ id +' ]' } );

			break;


		// REMOVE ENTITY and its physics body ----------------------------------
		case 'rmvEntity':
			var entity	= e.data.id,
				e		= entities.indexOf( entity );
			( e === -1 ) || ( entities.splice( e, 1 ) );
			ecount--;
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

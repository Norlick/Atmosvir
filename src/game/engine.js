var GAME = GAME || {};

GAME.ts		= +(0.0); // TimeStep
GAME.dt		= +(0.0); // Delta

GAME.Engine = {};
( function() {

	'use strict';

	//--------------------------------------------------------------------------

		// bools
	var isReady		= false,
		isRunning	= false,
		doLogMS		= false,

		// ints
		tick		= 0|0,

		// floats
		frame_rate	= +(1000/60),
		lt			= +(0.0),
		ms			= +(0.0),

		// cached events
		initEvent	= {
			name		: 'init',
			data		: null
		};

	//--------------------------------------------------------------------------

	function loop( t ) {

		GAME.ts = +( t - lt );
		GAME.dt = +( GAME.ts / frame_rate );

		GAME.View.render();

		tick = requestAnimationFrame( loop );

		GAME.ProcessController.update();
		GAME.EventManager.deliver();

		if ( doLogMS ) {
			console.log(
				'Compute Time: %fms, Delta: %f, TimeStep: %f',
				performance.now() - t,
				GAME.dt
			);
		}
		lt = t;

	}

	//--------------------------------------------------------------------------

	this.init = function init() {
		if ( !isReady ) {
			GAME.World.init();
			GAME.View.init();
			isReady = true;
		}
	};

	this.shutdown = function shutdown() {
		if ( isReady && !isRunning ) {
			GAME.ProcessController.stopAll();
			GAME.View.shutdown();
			GAME.World.shutdown();
			isReady = false;
		}
	};

	this.start = function start() {
		if ( isReady && !isRunning ) {
			// Start game engine
			tick = requestAnimationFrame( loop );
			isRunning = true;

			return true;
		}
		return false;
	};

	this.stop = function stop() {
		if ( isRunning ) {
			// Stop game engine
			cancelAnimationFrame( tick );
			isRunning = false;

			return true;
		}
		return false;
	};

	//--------------------------------------------------------------------------

	this.load = function load( directory ) {
		if ( isReady ) {

			GAME.ProcessController.stopAll();

			GAME.Util.loadJSON( directory + 'loadfile.json', function( data ) {

				console.log(
					'Loading from file: %s',
					directory
				);

				data.dir = directory;

				// Start processors
				for ( let p of data.processors ) {
					GAME.ProcessController.start( p );
				}

				// Send init event
				initEvent.data = data;
				GAME.EventManager.send( initEvent ).deliver();

				// Create Entities
			} );
		}
	};

	//--------------------------------------------------------------------------

} ).call( GAME.Engine );

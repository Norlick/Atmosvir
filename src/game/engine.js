var GAME = GAME || {};

GAME.dt = +(0.0);
GAME.Engine = {};
( function() {

	'use strict';

	//--------------------------------------------------------------------------

		// bools
	var isReady		= false,
		isRunning	= false,
		doLogMS		= true,

		// ints
		tick		= 0|0,

		// floats
		frame_rate	= +(1000/60),
		lt			= +(0.0),
		ms			= +(0.0);

	//--------------------------------------------------------------------------

	function loop( t ) {

		GAME.dt = +( ( t - lt ) / frame_rate );

		GAME.View.render();

		tick = requestAnimationFrame( loop );

		GAME.ProcessController.update();
		GAME.EventManager.deliver();

		if ( doLogMS ) {
			console.log(
				'Compute Time: %fms, Delta: %f',
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

} ).call( GAME.Engine );

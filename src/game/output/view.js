var GAME = GAME || {};
GAME.View = {};
( function() {

	'use strict';

	var i = 0, x = 0, n = 0,

		cfg = Config.display,

		doLogMS	= false,
		ms		= +(0.0),

		// Viewport and Render dimensions
		vw = innerWidth |0,				vh = innerHeight |0,
		rw = vw * cfg.pixelratio |0,	rh = vh * cfg.pixelratio |0,

		// Camera parameters
		fov = 55 |0, aspect = +(vw/vh), near = 1 |0, far = 2000 |0,


		// Nested objects
		Renderer	= null,
		Camera		= null,
		Scene		= null;

	function resizeViewport() {

		if ( !cfg.staticviewport ) {
			vw = innerWidth |0;				vh = innerHeight |0;
			rw = vw * cfg.pixelratio |0;	rh = vh * cfg.pixelratio |0;
			aspect = +(vw/vh);
			Renderer.setSize( vw,vh );
		}
		console.info('Viewport resized');

	}

	//--------------------------------------------------------------------------

	this.init = function init() {

		Renderer = new THREE.WebGLRenderer( {
			canvas				: document.getElementById( 'Viewport' ),
			devicePixelRatio	: cfg.pixelratio
		} );
		if ( cfg.staticviewport ) Renderer.setSize( 640,480 );
		else Renderer.setSize( vw,vh );

		Camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

		Scene = GAME.World.getScene();
		Scene.add( Camera );

		window.onresize = resizeViewport;

		console.info( 'Initialized View' );

	};

	this.shutdown = function shutdown() {
		Renderer = null;
		Scene = null;
		Camera = null;
		window.onresize = null;
	};

	//--------------------------------------------------------------------------

	this.render = function render() {
		if ( doLogMS ) ms = performance.now();

		Renderer.render( Scene, Camera );

		if ( doLogMS ) console.log( 'Render Time: %fms', performance.now() - ms );
	};

	//--------------------------------------------------------------------------

} ).call( GAME.View );

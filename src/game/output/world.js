var GAME = GAME || {};
GAME.World = {};
( function() {

	'use strict';

	var Scene = null,
		Cache = {},
		Obj3D = {};

	// SETUP -------------------------------------------------------------------

	this.init = function init() {

		this.getScene();

		console.info( 'Initialized World' );

	};

	this.shutdown = function shutdown() {

		Scene = null;
		Cache = {};
		Obj3D = {};

	};

	//--------------------------------------------------------------------------

	this.getScene = function getScene() {
		if ( Scene === null ) {
			Scene = new THREE.Scene();
		}
		return Scene;
	};

	this.getObj3D = function getObj3D() {
		return Obj3D;
	};

	this.getViewSpaceNormal = function getViewSpaceNormal() {};

} ).call( GAME.World );

function Object3DProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name	: 'Object3D',
		watch	: 'object3d'
	} );

	//--------------------------------------------------------------------------

	var Obj3D = GAME.World.getObj3D(),

		Loader = new THREE.JSONLoader();

	//--------------------------------------------------------------------------

	this.processAddEntity = function( id ) {
		let e = GAME.eID[ id ];

		if ( e.object3d.resource === 'box' ) {
		} else {
			// LOAD MESH FROM URL
		}
	};
	this.processRmvEntity = function( id ) {};

	//--------------------------------------------------------------------------

}

function Object3DComponent( opt ) {

	'use strict';

	var opt = opt || {};

	this.resource = opt.resource || 'box';
	this.position = opt.position || [0,0,0];

}
Object3DComponent.prototype.name = 'object3d';

function Object3DProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name	: 'Object3D',
		watch	: 'object3d'
	} );

	//--------------------------------------------------------------------------

	var eID		= GAME.eID,
		Obj3D	= GAME.World.getObj3D(),
		Scene	= GAME.World.getScene(),

		Loader	= new THREE.JSONLoader();

	//--------------------------------------------------------------------------

	this.processAddEntity = function( id ) {
		let e = eID[ id ];

		if ( e.object3d.resource === 'box' ) {

			let geom	= new THREE.BoxGeometry( 1,1,1 ),
				mtl		= new THREE.MeshBasicMaterial( { color: 0x336699 } ),
				o		= Obj3D[ id ] = new THREE.Mesh( geom, mtl );
			o.position.fromArray( e.object3d.position );
			Scene.add( o );

		} else {

			Loader.load( e.object3d.resource, function( geom, mtl ) {
				// Create a MorphAnimMesh if animated, otherwise normal mesh
				let o = ( e.animation !== undefined ) ?
					Obj3D[ id ] = new THREE.MorphAnimMesh( geom, mtl ) :
					Obj3D[ id ] = new THREE.Mesh( geom, mtl );

				// Set base position from component
				o.position.fromArray( e.object3d.position );
				Scene.add( o );
			} );

		}
	};

	this.processRmvEntity = function( id ) {
		Scene.remove( Obj3D[ id ] );
		delete Obj3D[ id ];
	};

	//--------------------------------------------------------------------------

}

function Object3DComponent( opt ) {

	'use strict';

	var opt = opt || {};

	this.resource = opt.resource || 'box';
	this.position = opt.position || [0,0,0];

}
Object3DComponent.prototype.name = 'object3d';

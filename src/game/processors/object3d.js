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
		Loader.load( e.object3d.resource, function( geom, materials ) {
			let	mtl = new THREE.MeshFaceMaterial(materials),

				// Create a MorphAnimMesh if animated, otherwise normal mesh
				o = ( e.animation !== undefined ) ?
					Obj3D[ id ] = new THREE.MorphAnimMesh( geom, mtl ) :
					Obj3D[ id ] = new THREE.Mesh( geom, mtl );

			console.log( o );

			// Set base position from component
			o.position.fromArray( e.object3d.position );
			o.quaternion.fromArray( e.object3d.quaternion );

			Scene.add( o );
		} );
		console.log(Obj3D[id]);
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

	this.resource	= opt.resource || './data/objects/test/measures/2m.json';
	this.position	= opt.position || [ 0,0,0 ];
	this.quaternion	= opt.quaternion || [ 0,0,0,0 ];

}
Object3DComponent.prototype.name = 'object3d';

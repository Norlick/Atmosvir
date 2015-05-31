function AnimationProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'Animation',
		watch : [ 'animation', 'object3d' ]
	} );

	//--------------------------------------------------------------------------

	var i = 0, n = 0,
		eID		= GAME.eID,
		Obj3D	= GAME.World.getObj3D();

	//--------------------------------------------------------------------------

	this.processAddEntity = function( id ) {
		let a = eID[ id ].animation;
		for ( x in a.data ) {
			Obj3D[ id ].setAnimationLabel( x, a.data[x].start, a.data[x].stop );
		}
	};
	this.processRmvEntity = function( id ) {};

	//--------------------------------------------------------------------------

	this.update = function() {
		for ( i = 0, n = this.entities.length; i < n; i++ ) {
			if ( eID[ this.entities[i] ].animation.play ) {
				Obj3D[ this.entities[i] ].updateAnimation( GAME.ts );
			}
		}
	};

}

function AnimationComponent( opt ) {

	'use strict';

	var opt = opt || {};

	this.play = false;
	// data = [ {  name:'', start:0.0, end:0.0 } ]
	this.data = opt.data || {};

}
AnimationComponent.prototype.name = 'animation';

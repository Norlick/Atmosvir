function CameraProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'Camera'
	} );

	//--------------------------------------------------------------------------

	var	eID		= GAME.eID,
		Camera	= GAME.View.getCamera(),

		// Active offsets
		_pos_offset			= new THREE.Vector3(),
		_look_target		= new THREE.Vector3(),

		// Default offsets
		third_person_offset	= new THREE.Vector3( 5, -20, -25 ),	// Third Person
		first_person_offset	= new THREE.Vector3();				// First Person

	//--------------------------------------------------------------------------

	function ThirdPersonCam() {}

	function FirstPersonCam() {}

	//--------------------------------------------------------------------------

	this.update = function() {};

}

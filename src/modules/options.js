function OptionsModule() {

	'use strict';

	//--------------------------------------------------------------------------

	App.construct( {

		name : 'options',

		onEnter : function() {
			GUI.goToSection( 'Options' );
		},

		onLeave : function() {}

	} );

	//--------------------------------------------------------------------------

}

function EditorModule() {

	'use strict';

	//--------------------------------------------------------------------------

	App.construct( {

		name : 'editor',

		onEnter : function() {
			GUI.goToSection( 'Game' );
		},

		onLeave : function() {}

	} );

	//--------------------------------------------------------------------------

}

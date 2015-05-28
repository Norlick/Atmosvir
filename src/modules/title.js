function TitleModule() {

	'use strict';

	var mainmenu = {
		newgame		: document.getElementById('mm_newgame'),
		continue	: document.getElementById('mm_continue'),
		loadgame	: document.getElementById('mm_loadgame'),
		options		: document.getElementById('mm_options')
	};
	mainmenu.newgame.onclick = function() {
		App.goTo( 'game' );
	};
	mainmenu.continue.onclick = function() {};
	mainmenu.loadgame.onclick = function() {
		App.goTo( 'loadsave' );
	};
	mainmenu.options.onclick = function() {
		App.goTo( 'options' );
	};

	//--------------------------------------------------------------------------

	App.construct( {

		name : 'title',

		onEnter : function() {
			GUI.goToSection( 'Title' );
		},

		onLeave : function() {}

	} );

	//--------------------------------------------------------------------------

}

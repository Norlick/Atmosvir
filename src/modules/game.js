function GameModule() {

	'use strict';

	var btn = {
		backToTitle			: document.getElementById( 'dbg_backToTitle' ),
		toggleEngineLoop	: document.getElementById( 'dbg_toggleEngineLoop' )
	};

	btn.backToTitle.onclick = function() {
		App.goTo( 'title' );
	};
	btn.toggleEngineLoop.onclick = function() {
		GAME.Engine.stop() || GAME.Engine.start();
	};

	//--------------------------------------------------------------------------

	App.construct( {

		name : 'game',

		onEnter : function() {
			GUI.goToSection( 'Game' );

			GAME.Engine.init();

			console.log(
				'%cSTARTING GAMEPLAY PROCESSORS',
				'font-weight:bold;color:#555;text-decoration:underline'
			);

			GAME.Engine.load( './data/maps/test/helloworld/' );
		},

		onLeave : function() {
			GAME.Engine.stop();

			console.log(
				'%cSTOPPING GAMEPLAY PROCESSORS',
				'font-weight:bold;color:#555;text-decoration:underline'
			);

			GAME.Engine.shutdown();
		}

	} );

	//--------------------------------------------------------------------------

}

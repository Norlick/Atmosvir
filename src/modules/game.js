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
			GAME.ProcessController.start( 'camera' );
			GAME.ProcessController.start( 'map' );
			GAME.ProcessController.start( 'object3d' );
			GAME.ProcessController.start( 'animation' );
			GAME.ProcessController.start( 'physics' );
			GAME.ProcessController.start( 'actor' );
			GAME.ProcessController.start( 'inventory' );
			GAME.ProcessController.start( 'player' );
			GAME.ProcessController.start( 'ai' );
		},

		onLeave : function() {
			GAME.Engine.stop();

			console.log(
				'%cSTOPPING GAMEPLAY PROCESSORS',
				'font-weight:bold;color:#555;text-decoration:underline'
			);
			GAME.ProcessController.stop( 'camera' );
			GAME.ProcessController.stop( 'object3d' );
			GAME.ProcessController.stop( 'animation' );
			GAME.ProcessController.stop( 'physics' );
			GAME.ProcessController.stop( 'actor' );
			GAME.ProcessController.stop( 'inventory' );
			GAME.ProcessController.stop( 'player' );
			GAME.ProcessController.stop( 'ai' );

			GAME.Engine.shutdown();
		}

	} );

	//--------------------------------------------------------------------------

}

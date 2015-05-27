function GameModule() {

	'use strict';

	//--------------------------------------------------------------------------

	App.construct( {

		name : 'game',

		onEnter : function() {
			GAME.Engine.init();
			console.log(
				'%cSTARTING GAMEPLAY PROCESSORS',
				'font-weight:bold;color:#555;text-decoration:underline'
			);
			GAME.ProcessController.start( 'camera' );
			GAME.ProcessController.start( 'object3d' );
			GAME.ProcessController.start( 'animation' );
			GAME.ProcessController.start( 'physics' );
			GAME.ProcessController.start( 'actor' );
			GAME.ProcessController.start( 'inventory' );
			GAME.ProcessController.start( 'player' );
			GAME.ProcessController.start( 'ai' );
		},

		onLeave : function() {
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
		}

	} );

	//--------------------------------------------------------------------------

}

function AIProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'AI',
		watch : [ 'actor', 'ai' ]
	} );

	//--------------------------------------------------------------------------

	var AIWorker = null;

	//--------------------------------------------------------------------------

	this.onStart = function() {
		console.log( 'Started AIWorker' );
	};
	this.onStop = function() {};

	//--------------------------------------------------------------------------

	this.processAddEntity = function( id ) {};
	this.processRmvEntity = function( id ) {};

	//--------------------------------------------------------------------------

	this.update = function() {
		console.log('AI Update');
	};

}

function AIComponent( opt ) {

	'use strict';

	var opt = opt || {};

}
AIComponent.prototype.name = 'ai';

function InventoryProcessor() {

	'use strict';

	GAME.ProcessController.construct( this, {
		name : 'Inventory',
		watch : [ 'inventory', 'actor' ]
	} );

}

function InventoryComponent( opt ) {

	'use strict';

	var opt = opt || {};

}
InventoryComponent.prototype.name = 'inventory';

'use strict';

var UPDATE		= 0,
	ADD			= 1,
	REMOVE		= 2;

//------------------------------------------------------------------------------

onmessage = function( e ) {

	switch ( e.data.cmd ) {

		case UPDATE:
			// Update loop
			break;

		case ADD:
			// Add AI Actor
			break;

		case REMOVE:
			// Remove AI Actor
			break;

	}

};

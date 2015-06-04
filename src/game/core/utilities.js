var GAME = GAME || {};

GAME.Util = {
	loadJSON : function( url, callback ) {

		var request = new XMLHttpRequest();

		request.open( 'GET', url, true );

		request.onload = function() {
			if ( request.status >= 200 && request.status < 400 ) {

				// Request GET
				var data = JSON.parse( request.responseText );
				callback( data );

			} else {

				// Reached target server, but request FAIL
				console.log( 'ERROR: COULDNT LOAD JSON FROM SERVER!' );

			}
		};

		request.onerror = function() {
			// There was a connection error of some sort
			console.log( 'ERROR LOADING JSON!' );
		};

		request.send();

	}
};

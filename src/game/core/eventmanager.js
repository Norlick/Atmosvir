var GAME = GAME || {};
GAME.EventManager = {};

( function() {

	'use strict';

	var i = 0, x = 0, q = 0,

		doLogEvents		= true,

		_maxqueued		= 3 *16,
		Queue			= new Array( _maxqueued ),
		queue_length	= 0,

		Recievers		= [];

	//--------------------------------------------------------------------------

	// If the reciever has a response to the event, call it and pass the event.
	function notify( r,e ) {
		r.events[ e.name ] === undefined || r.events[ e.name ].call( r,e );
	}

	//--------------------------------------------------------------------------

	this.send = function send( event ) {
		if ( queue_length !== _maxqueued ) {
			Queue[ queue_length++ ] = event;
			if ( doLogEvents ) {
				console.log( 'Sent Event[ %s ] to Queue', event.name );
			}
		} else {
			console.error( 'Event Queue full! Some events have been ignored!' );
		}
		return this;
	};

	this.register = function register( reciever ) {
		if ( Recievers.indexOf( reciever ) === -1 ) {
			Recievers.push( reciever );
			console.info(
				'Registered Event Reciever: %s',
				reciever.printname
			);
		} else {
			console.warn(
				'Could not register Reciever[ %s ] as it is already registered',
				reciever.printname
			);
		}
	};

	this.unregister = function unregister( reciever ) {
		let r = Recievers.indexOf( reciever );
		if ( r !== -1 ) {
			Recievers.splice( r,1 );
			console.info(
				'Unregistered Event Reciever: %s',
				reciever.printname
			);
		} else {
			console.error(
				'Cannot unregister Reciever[ %s ] as it is already unregistered',
				reciever.printname
			);
		}
	};

	this.deliver = function deliver() {
		for ( q=0; q < queue_length; q++ ) {

			if ( doLogEvents ) {
				console.log( 'Delivering Event[%s]', Queue[q].name );
			}

			for ( x=0; x < Recievers.length; x++ ) {
				notify( Recievers[x], Queue[q] );
			}

		}
		queue_length = 0;
	};

	//--------------------------------------------------------------------------

} ).call( GAME.EventManager );

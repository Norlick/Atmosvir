var GAME = GAME || {};
GAME.ProcessController = {};

( function() {
	'use strict';

	var i = 0, x = 0, n = 0,
		indx = 0,

		eID				= GAME.eID,

		Processors		= [],
		ProcessorDict	= {},

		Updaters		= [];

	//--------------------------------------------------------------------------

	function Processor( name, watch ) {

		this.name = name.toLowerCase();
		this.printname = name + ' Processor';

		this.events = this.events || {};

		if ( watch !== undefined ) {

			this.watching	= ( Array.isArray( watch ) ) ? watch : [ watch ];
			this.entities	= [];
			this.ecount		= 0|0;

			this.events.entityChanged = function( e ) {

				indx = this.entities.indexOf( e.id );
				if ( GAME.eID[ e.id ].has( this.watching ) ) {
					if ( indx === -1 ) {
						if ( this.processAddEntity !== undefined ) {
							this.processAddEntity( e.id );
						}
						this.ecount = this.entities.push( e.id ) +1;
						console.info(
							'%s acquired Entity[ %d ]',
							this.printname,
							e.id
						);
					}

				} else if ( indx !== -1 ) {
					if ( this.processRmvEntity !== undefined ) {
						this.processRmvEntity( e.id );
					}
					this.entities.splice( indx,1 );
					this.ecount = this.entities.length;
					console.info(
						'%s unattached from Entity[ %d ]',
						this.printname,
						e.id
					);
				}

			};

			// Previously-used 'entityDestroyed' event is pretty much useless,
			// assuming we let processors handle adding and removal of entities

		}

		ProcessorDict[ this.name ] = Processors.push( this ) -1;

		console.info( 'Constructed %s', this.printname );

	}

	//--------------------------------------------------------------------------

	this.construct = function construct( obj, opt ) {

		Processor.call( obj, opt.name, opt.watch );

	};

	this.start = function start( name ) {

		let p = Processors[ ProcessorDict[name] ];

		if ( p.onStart !== undefined ) p.onStart();

		if ( p.update !== undefined ) {
			Updaters.push( ProcessorDict[name] );
		}

		GAME.EventManager.register( p );

		console.info( 'Started %s', p.printname );

	};

	this.stop = function stop( name ) {

		let p = Processors[ ProcessorDict[name] ];

		if ( p.onStop !== undefined ) p.onStop();

		if ( p.update !== undefined ) {
			Updaters.splice( Updaters.indexOf( ProcessorDict[name] ), 1 );
		}

		GAME.EventManager.unregister( p );

		console.info( 'Stopped %s', p.printname );
	};

	this.update = function update() {
		for ( i=0; i<Updaters.length; i++ ) {
			Processors[ Updaters[i] ].update();
		}
	};

	//--------------------------------------------------------------------------

} ).call( GAME.ProcessController );

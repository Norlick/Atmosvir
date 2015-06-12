var GAME = GAME || {};
GAME.ProcessController = {};

( function() {
	'use strict';

	var i = 0, x = 0, n = 0,
		indx = 0,

		eID					= GAME.eID,

		Processors			= [],
		ProcessorDict		= {},

		activeProcessors	= new Set(),
		Updaters			= [];

	//--------------------------------------------------------------------------

	function Processor( name, watch ) {

		var has	= false;

		this.name = name.toLowerCase();
		this.printname = name + ' Processor';

		this.events = this.events || {};

		if ( watch !== undefined ) {

			this.watching	= ( Array.isArray( watch ) ) ? watch : [ watch ];
			this.entities	= new Set();
			// CHANGED this.entities from Array to Set

			this.events.entityChanged = function( e ) {

				has = this.entities.has( e.id );
				if ( GAME.eID[ e.id ].has( this.watching ) ) {
					if ( !has ) {
						if ( this.processAddEntity !== undefined ) {
							this.processAddEntity( e.id );
						}
						this.entities.add( e.id ) +1;
						console.info(
							'%s connected to Entity[ %d ]',
							this.printname,
							e.id
						);
					}

				} else if ( has ) {
					if ( this.processRmvEntity !== undefined ) {
						this.processRmvEntity( e.id );
					}
					this.entities.remove( e.id );
					console.info(
						'%s disconnected from Entity[ %d ]',
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

		activeProcessors.add( name );

		console.info( 'Started %s', p.printname );

	};

	this.stop = function stop( name ) {

		let p = Processors[ ProcessorDict[name] ];

		if ( p.onStop !== undefined ) p.onStop();

		if ( p.update !== undefined ) {
			Updaters.splice( Updaters.indexOf( ProcessorDict[name] ), 1 );
		}


		GAME.EventManager.unregister( p );

		activeProcessors.delete( name );

		console.info( 'Stopped %s', p.printname );
	};

	this.stopAll = function stopAll() {
		for ( let p of activeProcessors ) {
			this.stop( p );
		}
	};

	//--------------------------------------------------------------------------

	this.update = function update() {
		for ( i=0; i<Updaters.length; i++ ) {
			Processors[ Updaters[i] ].update();
		}
	};

	//--------------------------------------------------------------------------

} ).call( GAME.ProcessController );

/*\
|*| Main Compact Finite-State Machine ------------------------------------------
\*/

var App = {};
( function() {

	'use strict';

	var t			= 0.0,

		modules		= [],
		moduleList	= {},
		cntModule	= -1;

	//--------------------------------------------------------------------------

	function Module( opt ) {

		this.name = opt.name;

		this.onEnter = opt.onEnter || null;
		this.onLeave = opt.onLeave || null;

		this.index = moduleList[ this.name ] = modules.push( this ) -1;

	}

	//--------------------------------------------------------------------------

	this.construct = function( opt ) {

		console.info( 'Constructing state: %s', opt.name );
		new Module( opt );

	};

	this.goTo = function( s ) {

		console.info( '%cGoing to Module:%c %s','font-weight:bold', '', s )

		// Get state transition start time
		t = performance.now();

		if ( ( cntModule !== -1 ) && ( cntModule !== moduleList[s] ) ) {
				modules[ cntModule ].onLeave === null
					|| modules[ cntModule ].onLeave( s );
		}

		if ( cntModule !== moduleList[ s ] ) {
			modules[ moduleList[s] ].onEnter === null
				|| modules[ moduleList[s] ].onEnter( moduleList[ cntModule ] );
			cntModule = moduleList[s];
		}

		console.log( 'Module transition took %fms', ( performance.now() - t ) );

	};

	//--------------------------------------------------------------------------

} ).call( App );

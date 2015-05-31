var GUI = {};
( function() {

	'use strict';

	//--------------------------------------------------------------------------

	this.init = function init() {
		console.info( 'Initialized GUI' );
	};

	this.shutdown = function shutdown() {};

	//--------------------------------------------------------------------------

	this.goToSection = function goToSection( id ) {
		let s = document.querySelector( 'section.active' );
		let t = document.getElementById( id );

		if ( s !== null ) s.className = '';
		if ( t !== null ) t.className = 'active';
	};

} ).call( GUI );

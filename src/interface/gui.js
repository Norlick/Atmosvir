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
		if ( s !== null ) s.className = '';
		s = document.getElementById( id );
		s.className = 'active';
	};

} ).call( GUI );

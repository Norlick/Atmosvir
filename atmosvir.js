window.onload = function Atmosvir() {

	'use strict';

	GUI.init();
	Input.init();
	Sound.init();

	// Initialize Application Modules
	new TitleModule();
	new LoadSaveModule();
	new GameModule();
	new OptionsModule();
	new EditorModule();

	// Initialize Processors
	new CameraProcessor();
	new MapProcessor();
	new Object3DProcessor();
	new AnimationProcessor();
	new PhysicsProcessor();
	new ActorProcessor();
	new InventoryProcessor();
	new PlayerProcessor();
	new AIProcessor();

	// Go to Title Screen
	App.goTo('title');

};

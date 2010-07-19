if(!dojo._hasResource["dojox.editor.tests.module"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.editor.tests.module"] = true;
dojo.provide("dojox.editor.tests.module");

try{
	var userArgs = window.location.search.replace(/[\?&](dojoUrl|testUrl|testModule)=[^&]*/g,"").replace(/^&/,"?");

	// Base editor functionality
	doh.registerUrl("dojox.editor.tests.robot.Editor_Smiley", dojo.moduleUrl("dojox","editor/tests/robot/Editor_Smiley.html"+userArgs), 99999999);

    
}catch(e){
	doh.debug(e);
}




}

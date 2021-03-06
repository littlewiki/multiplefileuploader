/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["multiplefileuploader.widget.UploadResultPane"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["multiplefileuploader.widget.UploadResultPane"] = true;
dojo.provide("multiplefileuploader.widget.UploadResultPane");
dojo.require('dijit.Tooltip');

dojo.require("dijit._Templated");
multiplefileuploader.widget.REMOVE_UNIT_DURATION = 5000;
multiplefileuploader.widget.FADE_OUT_DURATION = 500;  
dojo.declare("multiplefileuploader.widget.UploadResultPane", [dijit._Widget,dijit._Templated], {
     
	templateString: dojo.cache("multiplefileuploader.widget", "UploadResultPane.html", "<div>\n\t\n\n<div dojoAttachPoint=\"thumb\"></div>\n\t\n<div dojoAttachPoint=\"uploadedImageInformationContainer\">\n\n\t<span dojoAttachPoint=\"cancelUploadCheckbox\"></span>\n\t<strong><span dojoAttachPoint=\"uploadedFilename\"></span></strong>\n\t<i>(<span dojoAttachPoint=\"mimetype\"></span>)</i>\n\t(<span dojoAttachPoint=\"size\"></span>)\n\t<input dojoAttachPoint=\"uploadedFileID\" type=\"hidden\"></input>\n</div>\t\n\n</div>\n"),
	
	postCreate: function(params){
	    this._eventHandles = new Array([]);		
		this._displayCancelCheckbox();
		this._displayUploadedFilename();
		this._displayMimetype();
		this._displaySize();
		this._displayUploadedFileID();	
	    if(this.uploadedImageInformation.getThumbURL() != null) {
			this._displayThumb();
		}
    },    
  hide: function() {
        dojo.style(this.uploadedImageInformationContainer, { display: "none"});           
  },
   
    _displayThumb : function() {
		 new dijit.Tooltip({
			label:"<img src="+this.uploadedImageInformation.getThumbURL()+"/>", 
			connectId:[this.uploadedFilename],
			showDelay: this.config_UI.showDelay,
			position:["below"]
		});
	},
	_displayCancelCheckbox : function() {		
		var cb = new dijit.form.CheckBox({
				checked: true, 
				disabled: false
			}, this.cancelUploadCheckbox);		
		dojo.connect(cb, 'onClick', dojo.hitch(this, function() {this._deleteFilenameIfNeeded(cb); }) );
		this._eventHandles.push(cb);	
	},	
	_displayUploadedFilename : function() {	
			dojo.place(document.createTextNode(this.uploadedImageInformation.getName()), this.uploadedFilename); 			
	},	
	_displayMimetype : function() {
			dojo.place(document.createTextNode(this.uploadedImageInformation.getMimeType()), this.mimetype); 	
	},
	_displaySize : function() {
			dojo.place(document.createTextNode(this.uploadedImageInformation.getSize()), this.size); 
	},
	_displayUploadedFileID : function() {
			dojo.attr(this.uploadedFileID, "id",this.uploadValuePrefix+this.uploadedImageInformation.getID()); 		
	},
	_deleteFilenameIfNeeded : function(cb) {
	
			if (cb.checked)
					this.uploadedFileID.removeAttribute("disabled");
				else
					dojo.attr(this.uploadedFileID, "disabled", "");
									
				setTimeout(
					dojo.hitch(this, function () {
						if(!cb.checked) {					
							dojo.fadeOut({ node:this.uploadedImageInformationContainer, 
											duration:multiplefileuploader.widget.FADE_OUT_DURATION,
											onEnd: dojo.hitch(this, function(){
												this.unit.requestDeletion()							
											})
										 }).play();					
						}
					}),multiplefileuploader.widget.REMOVE_UNIT_DURATION
				); 	
	},
			
	destroy : function() {
		dojo.forEach(this._eventHandles, function (handle) {
		        dojo.disconnect(handle);
		    });				
		this.inherited("destroy",arguments);
 	}
});

}

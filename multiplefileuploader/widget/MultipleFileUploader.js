dojo.provide("multiplefileuploader.widget.MultipleFileUploader");
dojo.require("multiplefileuploader.widget.UploadManager");
dojo.require("multiplefileuploader.tests.FakeUploadStrategy");
dojo.require("multiplefileuploader.widget.UploadUnit");
dojo.require("multiplefileuploader.widget.UploadUnitContainer");
dojo.require("multiplefileuploader.widget.UploadInputPane");
dojo.require("dojox.data.dom");
dojo.require("dojox.collections.ArrayList");
dojo.require("dijit._Templated");

dojo.requireLocalization("multiplefileuploader", "messages");
multiplefileuploader.widget._uploadContainerMessages = dojo.i18n.getLocalization("multiplefileuploader","messages");

dojo.declare("multiplefileuploader.widget.MultipleFileUploader", [dijit._Widget,dijit._Templated], {
   
   
	    templatePath: dojo.moduleUrl("multiplefileuploader.widget","MultipleFileUploader.html"),	
		
		ajaxUploadUrl : "",
		statusParameterName : "statusID",
		uploadParameterName : "upload",
		uploadValuePrefix : "uploadedFile_",
		uploadTimeout : "",
		
		progressBarMode : true,
			statusTimeout : "",
			checkInterval : 2000, 
			uploadStatusURL : "",
			apc_php_enabled : true,
		
		
		fakeMode: false,
		fakeResponse: "",

   
	    postCreate: function(){
			
			var params = {
					onError: dojo.hitch(this, this._onError),
					onProgress: dojo.hitch(this, function(queueStatus){
						this._onProgress(queueStatus);
					}),
					onFinishedUploads: dojo.hitch(this, function() {
						this._onFinishedUploads();
					}),
					onFinishedUpload: dojo.hitch(this, function(uploadedFileInformation) {
						this._onFinishedUpload(uploadedFileInformation);
					}), 
					onAfterUploadStart: dojo.hitch(this, function(uploadRequest) {
						this._onAfterUploadStart(uploadRequest);
					})					
			};
			
			if (this.fakeMode) {		
	         	  var fakeUploadStrategy = {
						_uploadStrategy : new multiplefileuploader.tests.FakeUploadStrategy(this.fakeResponse)
				  };
				  dojo.mixin(params,fakeUploadStrategy);
			}
			
			var widget_tests= { 
				fakeMode : this.fakeMode,
				fakeResponse: this.fakeResponse
			};
			var widget_server = {
				ajaxUploadUrl : this.ajaxUploadUrl,	
				uploadParameterName : this.uploadParameterName,
				uploadValuePrefix : this.uploadValuePrefix,
				apc_php_enabled : this.apc_php_enabled
			};
			var widget_status = {
				uploadStatusURL : this.uploadStatusURL,
				progressBarMode : this.progressBarMode,
				statusTimeout : this.statusTimeout,
				checkInterval : this.checkInterval, 
				statusParameterName : this.statusParameterName		
			};

			this._uploadManager = new multiplefileuploader.widget.UploadManager( params, widget_server, widget_status);
			
			var params = {
				uploadManager: this._uploadManager,
				onInputDisplay : dojo.hitch(this, function(fileInput) {
					this.onInputDisplay(fileInput);
				})
			};
			
			this.uploadUnitContainer = new multiplefileuploader.widget.UploadUnitContainer(params, this.fileUploadContainer , this.uploadActionsContainer);			
 	},

	 
	 _onError : function() {
		this.onError();
	 },
	 _onProgress : function(queueStatus) {
	 	this.onProgress( queueStatus);
	 },
	 _onFinishedUpload : function(uploadedFileInformation) {
		this.onFinishedUpload(uploadedFileInformation);
	 },	 
	 _onFinishedUploads : function() {
		this.onFinishedUploads();
	 }, 
	 _onAfterUploadStart : function(uploadRequest){
	 	this.onAfterUploadStart(uploadRequest);
	 },
	 _onInputDisplay : function(fileInput){
	 	this.onInputDisplay(fileInput);
	 },
	 onError : function() {
	 }, 
	 onProgress : function(queueStatus) {	 	
	 },	 
	 onFinishedUploads : function() {
	 },	 
	 onFinishedUpload : function(uploadedFileInformation) { 	
	 },	
	 onAfterUploadStart : function(uploadRequest) {
	 },
	 onInputDisplay : function(fileInput) {
	 },
	 fireProgress : function() {
		this._uploadManager.fireProgress();
	 },
	 notifyLastFileInputChanged : function(uploadRequest) {
	 	this.uploadUnitContainer.notifyLastFileInputChanged(uploadRequest);
	 }

});


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

var fileObject, key='455ddef1e2a6b2a583e318c244f09c510a4efd8334f3b99297e866be8f7fe499',File_Name,ext,fp,plaintext;
		
function analyzeStringFromQR(str) {
    var ADR = 30,
        SHA = 64,
        SR = 16;
    var w = new Array(3);
    var path = "";
    for (var i = 0; i <= ADR + SHA; i++) {
        path += str[i];
    }
    w[0] = path;
    var pass = "";
    for (var i = ADR+SHA+1; i <= ADR+SHA+SR; i++) {
        pass += str[i];
    }
    w[1] = pass;
    var name = "";
    for (var i = ADR+SHA+SR+1; i < str.length; i++) {
        name += str[i];
    }
    w[2] = name;
    return w;
}

function decryptFile(ciphertext, key) {
	return Aes.Ctr.decrypt(ciphertext, key, 256);
}
function prepareFile(plaintext) {
	var bytes = new Uint8Array(plaintext.length);
	for (var i = 0; i < plaintext.length; i++){
		bytes[i] = plaintext.charCodeAt(i);
		alert(bytes[i]);
	}
	var decrypted = new Blob([bytes]);
	return decrypted;
}

function onLoad(){
	window.plugins.webintent.getUri(function(url) {
		//alert(url);
		if(url !== ""){
			var tab = new Array(2);
			tab=analyzeStringFromQR(url);
			//key=tab[0];
			document.getElementById("url").innerHTML=tab[1];
		}
		else
			document.getElementById("url").innerHTML="ERROR: Intent not received";
	});
}
function DownloadFile() {
	var URL=document.getElementById("url").innerHTML;
	var Folder_Name="QRget";
	File_Name=URL.substr(URL.lastIndexOf('/') + 1) 
	File_Name="test.c";
	for(i=1;i<=File_Name.length;i++){
		if(File_Name[i]=='.'){
			File_Name=File_Name.substr(0,i);
			break;
		}
	}
	
	if (URL == null && Folder_Name == null && File_Name == null) {
		return;
	}
	download(URL, Folder_Name); //If available download function call
}
function download(URL, Folder_Name) {
//step to request a file system 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
	
	function onFileSystemSuccess(fileSystem) {
		var download_link = encodeURI(URL);
		ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL
		var directoryEntry = fileSystem.root; // to get root path of directory
		directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
		var rootdir = fileSystem.root;
		ext="c";
		fp = rootdir.toURL(); // Returns Fulpath of local directory
		//fp = "file:///storage/sdcard0/";
		fp = fp + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
		alert(fp);
		filetransfer(download_link);
	}

	function onDirectorySuccess(parent) {
		// Directory created successfuly
	}

	function onDirectoryFail(error) {
		//Error while creating directory
		alert("Unable to create new directory: " + error.code);
	}

	function onFileSystemFail(evt) {
		//Unable to access file system
		alert("err");
		alert(evt.target.error.code);
	}
}
function filetransfer(download_link) {
	var fileTransfer = new FileTransfer();
	// File download function with URL and local path
	fileTransfer.download(download_link, "file:///storage/sdcard0/enc.c",			// fp dla poprawnego!!!!!
		function (entry) {
			alert("download complete: " + entry.fullPath+"\n now decrypting...");
			window.resolveLocalFileSystemURL(fp, gotFile, errorHandler);
		},
		function (error) {
			 //Download abort errors or download failed errors
			 alert("download error source " + error.source);
			 window.resolveLocalFileSystemURL(fp, gotFile, errorHandler);
		});
}
function gotFile(fileEntry){
	fileObject=fileEntry;
	fileEntry.file(function(file){
		var reader = new FileReader();
		reader.onloadend = function(e) {
			var ciphertext = this.result;
			alert(ciphertext);
			plaintext = decryptFile(ciphertext, key); 
			alert(plaintext);
			fileEntry.createWriter(gotFileWriter, errorHandler);
		}
		reader.readAsText(file);
	});
}
function gotFileWriter(writer){
	writer.write(plaintext);
	plaintext = null;
	File_Name = null;
	ext = null;
	fileObject = null;
	alert("File saved as "+fp);	
	fp = null;
}
function errorHandler(e) {
	alert(e);
}

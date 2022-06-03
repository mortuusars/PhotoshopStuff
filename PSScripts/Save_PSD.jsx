// Saves current document as PSD to the same directory.
#target photoshop  
main();  
function main(){  
if(!documents.length) return;  
var Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');  
Name = Name.replace(/\+$/,'');  
try{  
var savePath = activeDocument.path;  
}catch(e){  
    alert("You must save this document first!");  
    }  
var fileList= savePath.getFiles(Name +"*.psd").sort().reverse();  
var Suffix = 0;  
if(fileList.length){  
    Suffix = Number(fileList[0].name.replace(/\.[^\.]+$/, '').match(/\d+$/));  
}  
Suffix= zeroPad(Suffix + 1, 3);  
var saveFile = File(savePath + "/" + Name + ".psd");  
SavePSD(saveFile);  
}  
function SavePSD(saveFile){   
psdSaveOptions = new PhotoshopSaveOptions();   
psdSaveOptions.embedColorProfile = true;   
psdSaveOptions.alphaChannels = true;    
psdSaveOptions.layers = true;    
activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE);   
};  
function zeroPad(n, s) {   
   n = n.toString();   
   while (n.length < s)  n = '0' + n;   
   return n;   
}; 
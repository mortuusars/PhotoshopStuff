//Found somewhere on the internet, modified by mortuusars

#target photoshop;

if (app.documents.length > 0) {
  var thedoc = app.activeDocument;

  var docName = thedoc.name;
  if (docName.indexOf(".") != -1) {
    var basename = docName.match(/(.*)\.[^\.]+$/)[1];
  } else {
    var basename = docName;
  }
 
  var docPath = "C:/";

  var jpegOptions = new JPEGSaveOptions();
  jpegOptions.quality = 10;
  jpegOptions.embedColorProfile = true;
  jpegOptions.matte = MatteType.NONE;

  var filename = docPath + '/' + docName;

  thedoc.saveAs((new File(filename)), jpegOptions, true);
};
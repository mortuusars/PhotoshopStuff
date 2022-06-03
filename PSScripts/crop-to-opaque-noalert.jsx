/*
  Copyright (C) 2018, Southgarden Studios Inc.
  All rights reserved.

  Redistribution is PROHIBITED. To obtain a copy of this software visit:
  https://developer71240.github.io/crop-to-opaque/

  Use of any form of this software (including source and binary forms) is
  allowed for commercial and non-commercial use providing that the following
  conditions are met:

  1. No form may be redistributed or made public without prior written
     permission of Southgarden Studios Inc.

  2. Neither the name of Southgarden Studios Inc. nor Crop to Opaque nor the
     names of its contributors may be used to endorse or promote products
     derived from this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var startDisplayDialogs;
var restoreDisplayDialogs = false;
var startRulerUnits;
var restoreRulerUnits = false;
try {
  // save the state of displaying dialogs
  startDisplayDialogs = app.displayDialogs;
  // and remember that we saved it
  restoreDisplayDialogs = true;
  // do not display dialogs
  app.displayDialogs = DialogModes.NO;
  // save the ruler units preference
  startRulerUnits = app.preferences.rulerUnits;
  // and remember that we saved it
  restoreRulerUnits = true;
  // set the ruler units to pixels
  app.preferences.rulerUnits = Units.PIXELS;
  var thisDocument;
  try {
    // try to remember the active document
    thisDocument = app.activeDocument;
  } catch (e) {
    // alert the user that a document must be open
    scriptAlert("Photoshop", "A document must be open", "");
    //alert('A document must be open');
    // re-throw the exception to be caught below
    throw e;
  }
  try {
    // try to load the alpha channel of the current layer to selection
    var idsetd = charIDToTypeID('setd');
      var desc1 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref1 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref1.putProperty(idChnl, idfsel);
      desc1.putReference(idnull, ref1);
      var idT = charIDToTypeID('T   ');
        var ref2 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idChnl = charIDToTypeID('Chnl');
        var idTrsp = charIDToTypeID('Trsp');
        ref2.putEnumerated(idChnl, idChnl, idTrsp);
      desc1.putReference(idT, ref2);
    executeAction(idsetd, desc1, DialogModes.NO);
  } catch (e) {
    // alert the user that the current layer must have an alpha channel
    scriptAlert("Photoshop", "Current layer must have an alpha channel", "");
    //alert('Current layer must have an alpha channel');
    // re-throw the exception to be caught below
    throw e;
  }
  try {
    // try to test if there were no pixels selected
    if (parseInt(thisDocument.selection.bounds[0])-parseInt(thisDocument.selection.bounds[2]) == 0 || parseInt(thisDocument.selection.bounds[1])-parseInt(thisDocument.selection.bounds[3]) == 0) {
      throw true;
    }
  } catch (e) {
    // alert the user that the current layer must have some opaque area
    //alert('Current layer must have some opaque area');
    scriptAlert("Photoshop", "Current layer must have some opaque area", "");

    // re-throw the exception to be caught below
    throw e;
  }
  // create a new layer
  var idMk = charIDToTypeID('Mk  ');
    var desc2 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref3 = new ActionReference();
      var idLyr = charIDToTypeID('Lyr ');
      ref3.putClass(idLyr);
    desc2.putReference(idnull, ref3);
  executeAction(idMk, desc2, DialogModes.NO);
  // fill our selection
  var idFl = charIDToTypeID('Fl  ');
    var desc3 = new ActionDescriptor();
    var idUsng = charIDToTypeID('Usng');
    var idFlCn = charIDToTypeID('FlCn');
    var idBlck = charIDToTypeID('Blck');
    desc3.putEnumerated(idUsng, idFlCn, idBlck);
    var idOpct = charIDToTypeID('Opct');
    var idPrc = charIDToTypeID('#Prc');
    desc3.putUnitDouble(idOpct, idPrc, 100);
    var idMd = charIDToTypeID('Md  ');
    var idBlnM = charIDToTypeID('BlnM');
    var idNrml = charIDToTypeID('Nrml');
    desc3.putEnumerated(idMd, idBlnM, idNrml);
  executeAction(idFl, desc3, DialogModes.NO);
  // add a mask to our new layer
  var idMk = charIDToTypeID('Mk  ');
    var desc4 = new ActionDescriptor();
    var idNw = charIDToTypeID('Nw  ');
    var idChnl = charIDToTypeID('Chnl');
    desc4.putClass(idNw, idChnl);
    var idAt = charIDToTypeID('At  ');
      var ref4 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idChnl = charIDToTypeID('Chnl');
      var idMsk = charIDToTypeID('Msk ');
      ref4.putEnumerated(idChnl, idChnl, idMsk);
    desc4.putReference(idAt, ref4);
    var idUsng = charIDToTypeID('Usng');
    var idUsrM = charIDToTypeID('UsrM');
    var idRvlS = charIDToTypeID('RvlS');
    desc4.putEnumerated(idUsng, idUsrM, idRvlS);
  executeAction(idMk, desc4, DialogModes.NO);
  // apply a level 255 threshold to our layer mask
  var idThrs = charIDToTypeID('Thrs');
    var desc5 = new ActionDescriptor();
    var idLvl = charIDToTypeID('Lvl ');
    desc5.putInteger(idLvl, 255);
  executeAction(idThrs, desc5, DialogModes.NO);
  // apply our layer mask
  var idDlt = charIDToTypeID('Dlt ');
    var desc6 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref5 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idOrdn = charIDToTypeID('Ordn');
      var idTrgt = charIDToTypeID('Trgt');
      ref5.putEnumerated(idChnl, idOrdn, idTrgt);
    desc6.putReference(idnull, ref5);
    var idAply = charIDToTypeID('Aply');
    desc6.putBoolean(idAply, true);
  executeAction(idDlt, desc6, DialogModes.NO);
  // load the alpha channel of our layer to selection
  var idsetd = charIDToTypeID('setd');
    var desc7 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref6 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref6.putProperty(idChnl, idfsel);
    desc7.putReference(idnull, ref6);
    var idT = charIDToTypeID('T   ');
      var ref7 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idChnl = charIDToTypeID('Chnl');
      var idTrsp = charIDToTypeID('Trsp');
      ref7.putEnumerated(idChnl, idChnl, idTrsp);
    desc7.putReference(idT, ref7);
  executeAction(idsetd, desc7, DialogModes.NO);
  // delete our layer
  var idDlt = charIDToTypeID('Dlt ');
    var desc8 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref8 = new ActionReference();
      var idLyr = charIDToTypeID('Lyr ');
      var idOrdn = charIDToTypeID('Ordn');
      var idTrgt = charIDToTypeID('Trgt');
      ref8.putEnumerated(idLyr, idOrdn, idTrgt);
    desc8.putReference(idnull, ref8);
  executeAction(idDlt, desc8, DialogModes.NO);
  var edgeX;
  var edgeY;
  var edgeWidth;
  var edgeHeight;
  try {
    // try to test if there were no pixels selected
    if (parseInt(thisDocument.selection.bounds[0])-parseInt(thisDocument.selection.bounds[2]) == 0 || parseInt(thisDocument.selection.bounds[1])-parseInt(thisDocument.selection.bounds[3]) == 0) {
      throw true;
    }
    // save x, y, width, height of selection
    edgeX = parseInt(thisDocument.selection.bounds[0]);
    edgeY = parseInt(thisDocument.selection.bounds[1]);
    edgeWidth = parseInt(thisDocument.selection.bounds[2])-edgeX;
    edgeHeight = parseInt(thisDocument.selection.bounds[3])-edgeY;
  } catch (e) {
    // alert the user that the current layer must have some opaque area
    scriptAlert("Photoshop", "Current layer must have some opaque area", "");
    //alert('Current layer must have some opaque area');
    // re-throw the exception to be caught below
    throw e;
  }
  // invet the selection
  var idInvs = charIDToTypeID('Invs');
  executeAction(idInvs, undefined, DialogModes.NO);
  // save a history state before intersecting the selection
  var beforeIntersection = thisDocument.activeHistoryState;
  // intersect the selection with a diamond on the left side of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc9 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref9 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref9.putProperty(idChnl, idfsel);
    desc9.putReference(idnull, ref9);
    var idT = charIDToTypeID('T   ');
      var desc10 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list1 = new ActionList();
          var desc11 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc11.putUnitDouble(idHrzn, idPxl, edgeX);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc11.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list1.putObject(idPnt, desc11);
          var desc12 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc12.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc12.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/4);
        var idPnt = charIDToTypeID('Pnt ');
        list1.putObject(idPnt, desc12);
          var desc13 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc13.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc13.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list1.putObject(idPnt, desc13);
          var desc14 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc14.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc14.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight*3/4);
        var idPnt = charIDToTypeID('Pnt ');
        list1.putObject(idPnt, desc14);
      desc10.putList(idPts, list1);
    var idPlgn = charIDToTypeID('Plgn');
    desc9.putObject(idT, idPlgn, desc10);
    var idAntA = charIDToTypeID('AntA');
    desc9.putBoolean(idAntA, true);
  executeAction(idIntW, desc9, DialogModes.NO);
  // try to save the width of the selection
  var leftDiamondWidth;
  try {
    leftDiamondWidth = parseInt(thisDocument.selection.bounds[2])-edgeX;
  } catch (e) {
    leftDiamondWidth = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect the selection with a diamond on the right side of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc15 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref10 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref10.putProperty(idChnl, idfsel);
    desc15.putReference(idnull, ref10);
    var idT = charIDToTypeID('T   ');
      var desc16 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list2 = new ActionList();
          var desc17 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc17.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc17.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list2.putObject(idPnt, desc17);
          var desc18 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc18.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth*3/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc18.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/4);
        var idPnt = charIDToTypeID('Pnt ');
        list2.putObject(idPnt, desc18);
          var desc19 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc19.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc19.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list2.putObject(idPnt, desc19);
          var desc20 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc20.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth*3/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc20.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight*3/4);
        var idPnt = charIDToTypeID('Pnt ');
        list2.putObject(idPnt, desc20);
      desc16.putList(idPts, list2);
    var idPlgn = charIDToTypeID('Plgn');
    desc15.putObject(idT, idPlgn, desc16);
    var idAntA = charIDToTypeID('AntA');
    desc15.putBoolean(idAntA, true);
  executeAction(idIntW, desc15, DialogModes.NO);
  // try to save the width of the selection
  var rightDiamondWidth;
  try {
    rightDiamondWidth = (edgeX+edgeWidth)-parseInt(thisDocument.selection.bounds[0]);
  } catch (e) {
    rightDiamondWidth = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect the selection with a diamond on the top of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc21 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref11 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref11.putProperty(idChnl, idfsel);
    desc21.putReference(idnull, ref11);
    var idT = charIDToTypeID('T   ');
      var desc22 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list3 = new ActionList();
          var desc23 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc23.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc23.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/4);
        var idPnt = charIDToTypeID('Pnt ');
        list3.putObject(idPnt, desc23);
          var desc24 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc24.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc24.putUnitDouble(idVrtc, idPxl, edgeY);
        var idPnt = charIDToTypeID('Pnt ');
        list3.putObject(idPnt, desc24);
          var desc25 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc25.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth*3/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc25.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/4);
        var idPnt = charIDToTypeID('Pnt ');
        list3.putObject(idPnt, desc25);
          var desc26 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc26.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc26.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list3.putObject(idPnt, desc26);
      desc22.putList(idPts, list3);
    var idPlgn = charIDToTypeID('Plgn');
    desc21.putObject(idT, idPlgn, desc22);
    var idAntA = charIDToTypeID('AntA');
    desc21.putBoolean(idAntA, true);
  executeAction(idIntW, desc21, DialogModes.NO);
  // try to save the height of the selection
  var topDiamondHeight;
  try {
    topDiamondHeight = parseInt(thisDocument.selection.bounds[3])-edgeY;
  } catch (e) {
    topDiamondHeight = 0;
  }
  // intersect the selection with a rectangle clipping the sides
  var idIntW = charIDToTypeID('IntW');
    var desc27 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref12 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref12.putProperty(idChnl, idfsel);
    desc27.putReference(idnull, ref12);
    var idT = charIDToTypeID('T   ');
      var desc28 = new ActionDescriptor();
      var idTop = charIDToTypeID('Top ');
      var idPxl = charIDToTypeID('#Pxl');
      desc28.putUnitDouble(idTop, idPxl, edgeY);
      var idLeft = charIDToTypeID('Left');
      var idPxl = charIDToTypeID('#Pxl');
      desc28.putUnitDouble(idLeft, idPxl, edgeX+leftDiamondWidth);
      var idBtom = charIDToTypeID('Btom');
      var idPxl = charIDToTypeID('#Pxl');
      desc28.putUnitDouble(idBtom, idPxl, edgeY+edgeHeight);
      var idRght = charIDToTypeID('Rght');
      var idPxl = charIDToTypeID('#Pxl');
      desc28.putUnitDouble(idRght, idPxl, edgeX+edgeWidth-rightDiamondWidth);
    var idRctn = charIDToTypeID('Rctn');
    desc27.putObject(idT, idRctn, desc28);
  executeAction(idIntW, desc27, DialogModes.NO);
  // try to save the height of the selection when the sides are clipped first
  var topDiamondHeightSidesClipped;
  try {
    topDiamondHeightSidesClipped = parseInt(thisDocument.selection.bounds[3])-edgeY;
  } catch (e) {
    topDiamondHeightSidesClipped = 0;
  }
  // if there is no selection, intersection should not confuse our numbers
  if (topDiamondHeight == 0) {
    topDiamondHeightSidesClipped = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect the selection with a diamond on the bottom of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc29 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref13 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref13.putProperty(idChnl, idfsel);
    desc29.putReference(idnull, ref13);
    var idT = charIDToTypeID('T   ');
      var desc30 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list4 = new ActionList();
          var desc31 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc31.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc31.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight*3/4);
        var idPnt = charIDToTypeID('Pnt ');
        list4.putObject(idPnt, desc31);
          var desc32 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc32.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc32.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list4.putObject(idPnt, desc32);
          var desc33 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc33.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth*3/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc33.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight*3/4);
        var idPnt = charIDToTypeID('Pnt ');
        list4.putObject(idPnt, desc33);
          var desc34 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc34.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc34.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight);
        var idPnt = charIDToTypeID('Pnt ');
        list4.putObject(idPnt, desc34);
      desc30.putList(idPts, list4);
    var idPlgn = charIDToTypeID('Plgn');
    desc29.putObject(idT, idPlgn, desc30);
    var idAntA = charIDToTypeID('AntA');
    desc29.putBoolean(idAntA, true);
  executeAction(idIntW, desc29, DialogModes.NO);
  // try to save the height of the selection
  var bottomDiamondHeight;
  try {
    bottomDiamondHeight = (edgeY+edgeHeight)-parseInt(thisDocument.selection.bounds[1]);
  } catch (e) {
    bottomDiamondHeight = 0;
  }
  // intersect the selection with a rectangle clipping the sides
  var idIntW = charIDToTypeID('IntW');
    var desc35 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref14 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref14.putProperty(idChnl, idfsel);
    desc35.putReference(idnull, ref14);
    var idT = charIDToTypeID('T   ');
      var desc36 = new ActionDescriptor();
      var idTop = charIDToTypeID('Top ');
      var idPxl = charIDToTypeID('#Pxl');
      desc36.putUnitDouble(idTop, idPxl, edgeY);
      var idLeft = charIDToTypeID('Left');
      var idPxl = charIDToTypeID('#Pxl');
      desc36.putUnitDouble(idLeft, idPxl, edgeX+leftDiamondWidth);
      var idBtom = charIDToTypeID('Btom');
      var idPxl = charIDToTypeID('#Pxl');
      desc36.putUnitDouble(idBtom, idPxl, edgeY+edgeHeight);
      var idRght = charIDToTypeID('Rght');
      var idPxl = charIDToTypeID('#Pxl');
      desc36.putUnitDouble(idRght, idPxl, edgeX+edgeWidth-rightDiamondWidth);
    var idRctn = charIDToTypeID('Rctn');
    desc35.putObject(idT, idRctn, desc36);
  executeAction(idIntW, desc35, DialogModes.NO);
  // try to save the height of the selection when the sides are clipped first
  var bottomDiamondHeightSidesClipped;
  try {
    bottomDiamondHeightSidesClipped = (edgeY+edgeHeight)-parseInt(thisDocument.selection.bounds[1]);
  } catch (e) {
    bottomDiamondHeightSidesClipped = 0;
  }
  // if there is no selection, intersection should not confuse our numbers
  if (bottomDiamondHeight == 0) {
    bottomDiamondHeightSidesClipped = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect the selection with a diamond on the left side of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc37 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref15 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref15.putProperty(idChnl, idfsel);
    desc37.putReference(idnull, ref15);
    var idT = charIDToTypeID('T   ');
      var desc38 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list5 = new ActionList();
          var desc39 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc39.putUnitDouble(idHrzn, idPxl, edgeX);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc39.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list5.putObject(idPnt, desc39);
          var desc40 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc40.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc40.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/4);
        var idPnt = charIDToTypeID('Pnt ');
        list5.putObject(idPnt, desc40);
          var desc41 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc41.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc41.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list5.putObject(idPnt, desc41);
          var desc42 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc42.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc42.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight*3/4);
        var idPnt = charIDToTypeID('Pnt ');
        list5.putObject(idPnt, desc42);
      desc38.putList(idPts, list5);
    var idPlgn = charIDToTypeID('Plgn');
    desc37.putObject(idT, idPlgn, desc38);
    var idAntA = charIDToTypeID('AntA');
    desc37.putBoolean(idAntA, true);
  executeAction(idIntW, desc37, DialogModes.NO);
  // intersect the selection with a rectangle clipping the top and bottom
  var idIntW = charIDToTypeID('IntW');
    var desc43 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref16 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref16.putProperty(idChnl, idfsel);
    desc43.putReference(idnull, ref16);
    var idT = charIDToTypeID('T   ');
      var desc44 = new ActionDescriptor();
      var idTop = charIDToTypeID('Top ');
      var idPxl = charIDToTypeID('#Pxl');
      desc44.putUnitDouble(idTop, idPxl, edgeY+topDiamondHeight);
      var idLeft = charIDToTypeID('Left');
      var idPxl = charIDToTypeID('#Pxl');
      desc44.putUnitDouble(idLeft, idPxl, edgeX);
      var idBtom = charIDToTypeID('Btom');
      var idPxl = charIDToTypeID('#Pxl');
      desc44.putUnitDouble(idBtom, idPxl, edgeY+edgeHeight-bottomDiamondHeight);
      var idRght = charIDToTypeID('Rght');
      var idPxl = charIDToTypeID('#Pxl');
      desc44.putUnitDouble(idRght, idPxl, edgeX+edgeWidth);
    var idRctn = charIDToTypeID('Rctn');
    desc43.putObject(idT, idRctn, desc44);
  executeAction(idIntW, desc43, DialogModes.NO);
  // try to save the width of the selection when the top and bottom are clipped first
  var leftDiamondWidthTopBottomClipped;
  try {
    leftDiamondWidthTopBottomClipped = parseInt(thisDocument.selection.bounds[2])-edgeX;
  } catch (e) {
    leftDiamondWidthTopBottomClipped = 0;
  }
  // if there is no selection, intersection should not confuse our numbers
  if (leftDiamondWidth == 0) {
    leftDiamondWidthTopBottomClipped = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect the selection with a diamond on the right side of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc45 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref17 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref17.putProperty(idChnl, idfsel);
    desc45.putReference(idnull, ref17);
    var idT = charIDToTypeID('T   ');
      var desc46 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list6 = new ActionList();
          var desc47 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc47.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc47.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list6.putObject(idPnt, desc47);
          var desc48 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc48.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth*3/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc48.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/4);
        var idPnt = charIDToTypeID('Pnt ');
        list6.putObject(idPnt, desc48);
          var desc49 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc49.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc49.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list6.putObject(idPnt, desc49);
          var desc50 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc50.putUnitDouble(idHrzn, idPxl, edgeX+edgeWidth*3/4);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc50.putUnitDouble(idVrtc, idPxl, edgeY+edgeHeight*3/4);
        var idPnt = charIDToTypeID('Pnt ');
        list6.putObject(idPnt, desc50);
      desc46.putList(idPts, list6);
    var idPlgn = charIDToTypeID('Plgn');
    desc45.putObject(idT, idPlgn, desc46);
    var idAntA = charIDToTypeID('AntA');
    desc45.putBoolean(idAntA, true);
  executeAction(idIntW, desc45, DialogModes.NO);
  // intersect the selection with a rectangle clipping the top and bottom
  var idIntW = charIDToTypeID('IntW');
    var desc51 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref18 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref18.putProperty(idChnl, idfsel);
    desc51.putReference(idnull, ref18);
    var idT = charIDToTypeID('T   ');
      var desc52 = new ActionDescriptor();
      var idTop = charIDToTypeID('Top ');
      var idPxl = charIDToTypeID('#Pxl');
      desc52.putUnitDouble(idTop, idPxl, edgeY+topDiamondHeight);
      var idLeft = charIDToTypeID('Left');
      var idPxl = charIDToTypeID('#Pxl');
      desc52.putUnitDouble(idLeft, idPxl, edgeX);
      var idBtom = charIDToTypeID('Btom');
      var idPxl = charIDToTypeID('#Pxl');
      desc52.putUnitDouble(idBtom, idPxl, edgeY+edgeHeight-bottomDiamondHeight);
      var idRght = charIDToTypeID('Rght');
      var idPxl = charIDToTypeID('#Pxl');
      desc52.putUnitDouble(idRght, idPxl, edgeX+edgeWidth);
    var idRctn = charIDToTypeID('Rctn');
    desc51.putObject(idT, idRctn, desc52);
  executeAction(idIntW, desc51, DialogModes.NO);
  // try to save the width of the selection when the top and bottom are clipped first
  var rightDiamondWidthTopBottomClipped;
  try {
    rightDiamondWidthTopBottomClipped = (edgeX+edgeWidth)-parseInt(thisDocument.selection.bounds[0]);
  } catch (e) {
    rightDiamondWidthTopBottomClipped = 0;
  }
  // if there is no selection, intersection should not confuse our numbers
  if (rightDiamondWidth == 0) {
    rightDiamondWidthTopBottomClipped = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // get ready to store coordinates
  var newEdgeX;
  var newEdgeY;
  var newEdgeWidth;
  var newEdgeHeight;
  // calculate larger area and store their coordinates
  if ((edgeWidth-leftDiamondWidth-rightDiamondWidth)*(edgeHeight-topDiamondHeightSidesClipped-bottomDiamondHeightSidesClipped) > (edgeWidth-leftDiamondWidthTopBottomClipped-rightDiamondWidthTopBottomClipped)*(edgeHeight-topDiamondHeight-bottomDiamondHeight)) {
    newEdgeX = edgeX+leftDiamondWidth;
    newEdgeY = edgeY+topDiamondHeightSidesClipped;
    newEdgeWidth = edgeWidth-leftDiamondWidth-rightDiamondWidth;
    newEdgeHeight = edgeHeight-topDiamondHeightSidesClipped-bottomDiamondHeightSidesClipped;
  } else {
    newEdgeX = edgeX+leftDiamondWidthTopBottomClipped;
    newEdgeY = edgeY+topDiamondHeight;
    newEdgeWidth = edgeWidth-leftDiamondWidthTopBottomClipped-rightDiamondWidthTopBottomClipped;
    newEdgeHeight = edgeHeight-topDiamondHeight-bottomDiamondHeight;
  }
  // intersect the selection with a triangle on the left side of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc53 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref19 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref19.putProperty(idChnl, idfsel);
    desc53.putReference(idnull, ref19);
    var idT = charIDToTypeID('T   ');
      var desc54 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list7 = new ActionList();
          var desc55 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc55.putUnitDouble(idHrzn, idPxl, newEdgeX);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc55.putUnitDouble(idVrtc, idPxl, newEdgeY);
        var idPnt = charIDToTypeID('Pnt ');
        list7.putObject(idPnt, desc55);
          var desc56 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc56.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeHeight/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc56.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list7.putObject(idPnt, desc56);
          var desc57 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc57.putUnitDouble(idHrzn, idPxl, newEdgeX);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc57.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight);
        var idPnt = charIDToTypeID('Pnt ');
        list7.putObject(idPnt, desc57);
      desc54.putList(idPts, list7);
    var idPlgn = charIDToTypeID('Plgn');
    desc53.putObject(idT, idPlgn, desc54);
    var idAntA = charIDToTypeID('AntA');
    desc53.putBoolean(idAntA, true);
  executeAction(idIntW, desc53, DialogModes.NO);
  var pixelsSelected;
  // try to see if we selected any pixels
  try {
    pixelsSelected = (parseInt(thisDocument.selection.bounds[2])-parseInt(thisDocument.selection.bounds[0]))*(parseInt(thisDocument.selection.bounds[3])-parseInt(thisDocument.selection.bounds[1]));
  } catch (e) {
    pixelsSelected = 0;
  }
  if (pixelsSelected) {
    // if there is a selection intersect it with the left half of our new width
    var idIntW = charIDToTypeID('IntW');
      var desc58 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref20 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref20.putProperty(idChnl, idfsel);
      desc58.putReference(idnull, ref20);
      var idT = charIDToTypeID('T   ');
        var desc59 = new ActionDescriptor();
        var idTop = charIDToTypeID('Top ');
        var idPxl = charIDToTypeID('#Pxl');
        desc59.putUnitDouble(idTop, idPxl, newEdgeY);
        var idLeft = charIDToTypeID('Left');
        var idPxl = charIDToTypeID('#Pxl');
        desc59.putUnitDouble(idLeft, idPxl, newEdgeX);
        var idBtom = charIDToTypeID('Btom');
        var idPxl = charIDToTypeID('#Pxl');
        desc59.putUnitDouble(idBtom, idPxl, newEdgeY+newEdgeHeight);
        var idRght = charIDToTypeID('Rght');
        var idPxl = charIDToTypeID('#Pxl');
        desc59.putUnitDouble(idRght, idPxl, newEdgeX+newEdgeWidth/2);
      var idRctn = charIDToTypeID('Rctn');
      desc58.putObject(idT, idRctn, desc59);
    executeAction(idIntW, desc58, DialogModes.NO);
  }
  var leftClip;
  // try to save the width of the selection
  try {
    leftClip = parseInt(thisDocument.selection.bounds[2])-newEdgeX;
  } catch (e) {
    leftClip = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect the selection with a triangle on the right side of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc60 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref21 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref21.putProperty(idChnl, idfsel);
    desc60.putReference(idnull, ref21);
    var idT = charIDToTypeID('T   ');
      var desc61 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list8 = new ActionList();
          var desc62 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc62.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeWidth);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc62.putUnitDouble(idVrtc, idPxl, newEdgeY);
        var idPnt = charIDToTypeID('Pnt ');
        list8.putObject(idPnt, desc62);
          var desc63 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc63.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeWidth-newEdgeHeight/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc63.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list8.putObject(idPnt, desc63);
          var desc64 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc64.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeWidth);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc64.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight);
        var idPnt = charIDToTypeID('Pnt ');
        list8.putObject(idPnt, desc64);
      desc61.putList(idPts, list8);
    var idPlgn = charIDToTypeID('Plgn');
    desc60.putObject(idT, idPlgn, desc61);
    var idAntA = charIDToTypeID('AntA');
    desc60.putBoolean(idAntA, true);
  executeAction(idIntW, desc60, DialogModes.NO);
  // try to see if we selected any pixels
  try {
    pixelsSelected = (parseInt(thisDocument.selection.bounds[2])-parseInt(thisDocument.selection.bounds[0]))*(parseInt(thisDocument.selection.bounds[3])-parseInt(thisDocument.selection.bounds[1]));
  } catch (e) {
    pixelsSelected = 0;
  }
  if (pixelsSelected) {
    // if there is a selection intersect it with the right half of our new width
    var idIntW = charIDToTypeID('IntW');
      var desc65 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref22 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref22.putProperty(idChnl, idfsel);
      desc65.putReference(idnull, ref22);
      var idT = charIDToTypeID('T   ');
        var desc66 = new ActionDescriptor();
        var idTop = charIDToTypeID('Top ');
        var idPxl = charIDToTypeID('#Pxl');
        desc66.putUnitDouble(idTop, idPxl, newEdgeY);
        var idLeft = charIDToTypeID('Left');
        var idPxl = charIDToTypeID('#Pxl');
        desc66.putUnitDouble(idLeft, idPxl, newEdgeX+newEdgeWidth/2);
        var idBtom = charIDToTypeID('Btom');
        var idPxl = charIDToTypeID('#Pxl');
        desc66.putUnitDouble(idBtom, idPxl, newEdgeY+newEdgeHeight);
        var idRght = charIDToTypeID('Rght');
        var idPxl = charIDToTypeID('#Pxl');
        desc66.putUnitDouble(idRght, idPxl, newEdgeX+newEdgeWidth);
      var idRctn = charIDToTypeID('Rctn');
      desc65.putObject(idT, idRctn, desc66);
    executeAction(idIntW, desc65, DialogModes.NO);
  }
  var rightClip;
  // try to save the width of the selection
  try {
    rightClip = (newEdgeX+newEdgeWidth)-parseInt(thisDocument.selection.bounds[0]);
  } catch (e) {
    rightClip = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect the selection with a triangle on the top side of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc67 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref23 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref23.putProperty(idChnl, idfsel);
    desc67.putReference(idnull, ref23);
    var idT = charIDToTypeID('T   ');
      var desc68 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list9 = new ActionList();
          var desc69 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc69.putUnitDouble(idHrzn, idPxl, newEdgeX);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc69.putUnitDouble(idVrtc, idPxl, newEdgeY);
        var idPnt = charIDToTypeID('Pnt ');
        list9.putObject(idPnt, desc69);
          var desc70 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc70.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeWidth/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc70.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeWidth/2);
        var idPnt = charIDToTypeID('Pnt ');
        list9.putObject(idPnt, desc70);
          var desc71 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc71.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeWidth);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc71.putUnitDouble(idVrtc, idPxl, newEdgeY);
        var idPnt = charIDToTypeID('Pnt ');
        list9.putObject(idPnt, desc71);
      desc68.putList(idPts, list9);
    var idPlgn = charIDToTypeID('Plgn');
    desc67.putObject(idT, idPlgn, desc68);
    var idAntA = charIDToTypeID('AntA');
    desc67.putBoolean(idAntA, true);
  executeAction(idIntW, desc67, DialogModes.NO);
  // try to see if we selected any pixels
  try {
    pixelsSelected = (parseInt(thisDocument.selection.bounds[2])-parseInt(thisDocument.selection.bounds[0]))*(parseInt(thisDocument.selection.bounds[3])-parseInt(thisDocument.selection.bounds[1]));
  } catch (e) {
    pixelsSelected = 0;
  }
  if (pixelsSelected) {
    // if there is a selection intersect it with the top half of our new width
    var idIntW = charIDToTypeID('IntW');
      var desc72 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref24 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref24.putProperty(idChnl, idfsel);
      desc72.putReference(idnull, ref24);
      var idT = charIDToTypeID('T   ');
        var desc73 = new ActionDescriptor();
        var idTop = charIDToTypeID('Top ');
        var idPxl = charIDToTypeID('#Pxl');
        desc73.putUnitDouble(idTop, idPxl, newEdgeY);
        var idLeft = charIDToTypeID('Left');
        var idPxl = charIDToTypeID('#Pxl');
        desc73.putUnitDouble(idLeft, idPxl, newEdgeX);
        var idBtom = charIDToTypeID('Btom');
        var idPxl = charIDToTypeID('#Pxl');
        desc73.putUnitDouble(idBtom, idPxl, newEdgeY+newEdgeHeight/2);
        var idRght = charIDToTypeID('Rght');
        var idPxl = charIDToTypeID('#Pxl');
        desc73.putUnitDouble(idRght, idPxl, newEdgeX+newEdgeWidth);
      var idRctn = charIDToTypeID('Rctn');
      desc72.putObject(idT, idRctn, desc73);
    executeAction(idIntW, desc72, DialogModes.NO);
  }
  var topClip;
  // try to save the height of the selection
  try {
    topClip = parseInt(thisDocument.selection.bounds[3])-newEdgeY;
  } catch (e) {
    topClip = 0;
  }
  if (topClip != 0) {
    // if there is a selection intersect it to remove the calculated sides
    var idIntW = charIDToTypeID('IntW');
      var desc74 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref25 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref25.putProperty(idChnl, idfsel);
      desc74.putReference(idnull, ref25);
      var idT = charIDToTypeID('T   ');
        var desc75 = new ActionDescriptor();
        var idTop = charIDToTypeID('Top ');
        var idPxl = charIDToTypeID('#Pxl');
        desc75.putUnitDouble(idTop, idPxl, newEdgeY);
        var idLeft = charIDToTypeID('Left');
        var idPxl = charIDToTypeID('#Pxl');
        desc75.putUnitDouble(idLeft, idPxl, newEdgeX+leftClip);
        var idBtom = charIDToTypeID('Btom');
        var idPxl = charIDToTypeID('#Pxl');
        desc75.putUnitDouble(idBtom, idPxl, newEdgeY+newEdgeHeight);
        var idRght = charIDToTypeID('Rght');
        var idPxl = charIDToTypeID('#Pxl');
        desc75.putUnitDouble(idRght, idPxl, newEdgeX+newEdgeWidth-rightClip);
      var idRctn = charIDToTypeID('Rctn');
      desc74.putObject(idT, idRctn, desc75);
    executeAction(idIntW, desc74, DialogModes.NO);
  }
  var topClipSidesClipped;
  // try to save the height of the selection
  try {
    topClipSidesClipped = parseInt(thisDocument.selection.bounds[3])-newEdgeY;
  } catch (e) {
    topClipSidesClipped = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect the selection with a triangle on the bottom side of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc76 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref26 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref26.putProperty(idChnl, idfsel);
    desc76.putReference(idnull, ref26);
    var idT = charIDToTypeID('T   ');
      var desc77 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list10 = new ActionList();
          var desc78 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc78.putUnitDouble(idHrzn, idPxl, newEdgeX);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc78.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight);
        var idPnt = charIDToTypeID('Pnt ');
        list10.putObject(idPnt, desc78);
          var desc79 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc79.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeWidth/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc79.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight-newEdgeWidth/2);
        var idPnt = charIDToTypeID('Pnt ');
        list10.putObject(idPnt, desc79);
          var desc80 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc80.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeWidth);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc80.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight);
        var idPnt = charIDToTypeID('Pnt ');
        list10.putObject(idPnt, desc80);
      desc77.putList(idPts, list10);
    var idPlgn = charIDToTypeID('Plgn');
    desc76.putObject(idT, idPlgn, desc77);
    var idAntA = charIDToTypeID('AntA');
    desc76.putBoolean(idAntA, true);
  executeAction(idIntW, desc76, DialogModes.NO);
  // try to see if we selected any pixels
  try {
    pixelsSelected = (parseInt(thisDocument.selection.bounds[2])-parseInt(thisDocument.selection.bounds[0]))*(parseInt(thisDocument.selection.bounds[3])-parseInt(thisDocument.selection.bounds[1]));
  } catch (e) {
    pixelsSelected = 0;
  }
  if (pixelsSelected) {
    // if there is a selection intersect it with the bottom half of our new width
    var idIntW = charIDToTypeID('IntW');
      var desc81 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref27 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref27.putProperty(idChnl, idfsel);
      desc81.putReference(idnull, ref27);
      var idT = charIDToTypeID('T   ');
        var desc82 = new ActionDescriptor();
        var idTop = charIDToTypeID('Top ');
        var idPxl = charIDToTypeID('#Pxl');
        desc82.putUnitDouble(idTop, idPxl, newEdgeY+newEdgeHeight/2);
        var idLeft = charIDToTypeID('Left');
        var idPxl = charIDToTypeID('#Pxl');
        desc82.putUnitDouble(idLeft, idPxl, newEdgeX);
        var idBtom = charIDToTypeID('Btom');
        var idPxl = charIDToTypeID('#Pxl');
        desc82.putUnitDouble(idBtom, idPxl, newEdgeY+newEdgeHeight);
        var idRght = charIDToTypeID('Rght');
        var idPxl = charIDToTypeID('#Pxl');
        desc82.putUnitDouble(idRght, idPxl, newEdgeX+newEdgeWidth);
      var idRctn = charIDToTypeID('Rctn');
      desc81.putObject(idT, idRctn, desc82);
    executeAction(idIntW, desc81, DialogModes.NO);
  }
  var bottomClip;
  // try to save the height of the selection
  try {
    bottomClip = (newEdgeY+newEdgeHeight)-parseInt(thisDocument.selection.bounds[1]);
  } catch (e) {
    bottomClip = 0;
  }
  if (bottomClip != 0) {
    // if there is a selection intersect it to remove the calculated sides
    var idIntW = charIDToTypeID('IntW');
      var desc83 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref28 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref28.putProperty(idChnl, idfsel);
      desc83.putReference(idnull, ref28);
      var idT = charIDToTypeID('T   ');
        var desc84 = new ActionDescriptor();
        var idTop = charIDToTypeID('Top ');
        var idPxl = charIDToTypeID('#Pxl');
        desc84.putUnitDouble(idTop, idPxl, newEdgeY);
        var idLeft = charIDToTypeID('Left');
        var idPxl = charIDToTypeID('#Pxl');
        desc84.putUnitDouble(idLeft, idPxl, newEdgeX+leftClip);
        var idBtom = charIDToTypeID('Btom');
        var idPxl = charIDToTypeID('#Pxl');
        desc84.putUnitDouble(idBtom, idPxl, newEdgeY+newEdgeHeight);
        var idRght = charIDToTypeID('Rght');
        var idPxl = charIDToTypeID('#Pxl');
        desc84.putUnitDouble(idRght, idPxl, newEdgeX+newEdgeWidth-rightClip);
      var idRctn = charIDToTypeID('Rctn');
      desc83.putObject(idT, idRctn, desc84);
    executeAction(idIntW, desc83, DialogModes.NO);
  }
  var bottomClipSidesClipped;
  // try to save the height of the selection
  try {
    bottomClipSidesClipped = (newEdgeY+newEdgeHeight)-parseInt(thisDocument.selection.bounds[1]);
  } catch (e) {
    bottomClipSidesClipped = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect the selection with a triangle on the left side of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc85 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref29 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref29.putProperty(idChnl, idfsel);
    desc85.putReference(idnull, ref29);
    var idT = charIDToTypeID('T   ');
      var desc86 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list11 = new ActionList();
          var desc87 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc87.putUnitDouble(idHrzn, idPxl, newEdgeX);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc87.putUnitDouble(idVrtc, idPxl, newEdgeY);
        var idPnt = charIDToTypeID('Pnt ');
        list11.putObject(idPnt, desc87);
          var desc88 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc88.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeHeight/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc88.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list11.putObject(idPnt, desc88);
          var desc89 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc89.putUnitDouble(idHrzn, idPxl, newEdgeX);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc89.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight);
        var idPnt = charIDToTypeID('Pnt ');
        list11.putObject(idPnt, desc89);
      desc86.putList(idPts, list11);
    var idPlgn = charIDToTypeID('Plgn');
    desc85.putObject(idT, idPlgn, desc86);
    var idAntA = charIDToTypeID('AntA');
    desc85.putBoolean(idAntA, true);
  executeAction(idIntW, desc85, DialogModes.NO);
  var pixelsSelected;
  // try to see if we selected any pixels
  try {
    pixelsSelected = (parseInt(thisDocument.selection.bounds[2])-parseInt(thisDocument.selection.bounds[0]))*(parseInt(thisDocument.selection.bounds[3])-parseInt(thisDocument.selection.bounds[1]));
  } catch (e) {
    pixelsSelected = 0;
  }
  if (pixelsSelected) {
    // if there is a selection intersect it with the left half of our new width
    var idIntW = charIDToTypeID('IntW');
      var desc90 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref30 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref30.putProperty(idChnl, idfsel);
      desc90.putReference(idnull, ref30);
      var idT = charIDToTypeID('T   ');
        var desc91 = new ActionDescriptor();
        var idTop = charIDToTypeID('Top ');
        var idPxl = charIDToTypeID('#Pxl');
        desc91.putUnitDouble(idTop, idPxl, newEdgeY);
        var idLeft = charIDToTypeID('Left');
        var idPxl = charIDToTypeID('#Pxl');
        desc91.putUnitDouble(idLeft, idPxl, newEdgeX);
        var idBtom = charIDToTypeID('Btom');
        var idPxl = charIDToTypeID('#Pxl');
        desc91.putUnitDouble(idBtom, idPxl, newEdgeY+newEdgeHeight);
        var idRght = charIDToTypeID('Rght');
        var idPxl = charIDToTypeID('#Pxl');
        desc91.putUnitDouble(idRght, idPxl, newEdgeX+newEdgeWidth/2);
      var idRctn = charIDToTypeID('Rctn');
      desc90.putObject(idT, idRctn, desc91);
    executeAction(idIntW, desc90, DialogModes.NO);
  }
  var leftClip;
  // try to save the width of the selection
  try {
    leftClip = parseInt(thisDocument.selection.bounds[2])-newEdgeX;
  } catch (e) {
    leftClip = 0;
  }
  if (leftClip != 0) {
    // if there is a selection intersect it to remove the calculated top and bottom
    var idIntW = charIDToTypeID('IntW');
      var desc92 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref31 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref31.putProperty(idChnl, idfsel);
      desc92.putReference(idnull, ref31);
      var idT = charIDToTypeID('T   ');
        var desc93 = new ActionDescriptor();
        var idTop = charIDToTypeID('Top ');
        var idPxl = charIDToTypeID('#Pxl');
        desc93.putUnitDouble(idTop, idPxl, newEdgeY+topClip);
        var idLeft = charIDToTypeID('Left');
        var idPxl = charIDToTypeID('#Pxl');
        desc93.putUnitDouble(idLeft, idPxl, newEdgeX);
        var idBtom = charIDToTypeID('Btom');
        var idPxl = charIDToTypeID('#Pxl');
        desc93.putUnitDouble(idBtom, idPxl, newEdgeY+newEdgeHeight-bottomClip);
        var idRght = charIDToTypeID('Rght');
        var idPxl = charIDToTypeID('#Pxl');
        desc93.putUnitDouble(idRght, idPxl, newEdgeX+newEdgeWidth);
      var idRctn = charIDToTypeID('Rctn');
      desc92.putObject(idT, idRctn, desc93);
    executeAction(idIntW, desc92, DialogModes.NO);
  }
  var leftClipTopBottomClipped;
  // try to save the width of the selection
  try {
    leftClipTopBottomClipped = parseInt(thisDocument.selection.bounds[2])-newEdgeX;
  } catch (e) {
    leftClipTopBottomClipped = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect the selection with a triangle on the right side of the selection
  var idIntW = charIDToTypeID('IntW');
    var desc94 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref32 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref32.putProperty(idChnl, idfsel);
    desc94.putReference(idnull, ref32);
    var idT = charIDToTypeID('T   ');
      var desc95 = new ActionDescriptor();
      var idPts = charIDToTypeID('Pts ');
        var list12 = new ActionList();
          var desc96 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc96.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeWidth);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc96.putUnitDouble(idVrtc, idPxl, newEdgeY);
        var idPnt = charIDToTypeID('Pnt ');
        list12.putObject(idPnt, desc96);
          var desc97 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc97.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeWidth-newEdgeHeight/2);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc97.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight/2);
        var idPnt = charIDToTypeID('Pnt ');
        list12.putObject(idPnt, desc97);
          var desc98 = new ActionDescriptor();
          var idHrzn = charIDToTypeID('Hrzn');
          var idPxl = charIDToTypeID('#Pxl');
          desc98.putUnitDouble(idHrzn, idPxl, newEdgeX+newEdgeWidth);
          var idVrtc = charIDToTypeID('Vrtc');
          var idPxl = charIDToTypeID('#Pxl');
          desc98.putUnitDouble(idVrtc, idPxl, newEdgeY+newEdgeHeight);
        var idPnt = charIDToTypeID('Pnt ');
        list12.putObject(idPnt, desc98);
      desc95.putList(idPts, list12);
    var idPlgn = charIDToTypeID('Plgn');
    desc94.putObject(idT, idPlgn, desc95);
    var idAntA = charIDToTypeID('AntA');
    desc94.putBoolean(idAntA, true);
  executeAction(idIntW, desc94, DialogModes.NO);
  // try to see if we selected any pixels
  try {
    pixelsSelected = (parseInt(thisDocument.selection.bounds[2])-parseInt(thisDocument.selection.bounds[0]))*(parseInt(thisDocument.selection.bounds[3])-parseInt(thisDocument.selection.bounds[1]));
  } catch (e) {
    pixelsSelected = 0;
  }
  if (pixelsSelected) {
    // if there is a selection intersect it with the right half of our new width
    var idIntW = charIDToTypeID('IntW');
      var desc99 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref33 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref33.putProperty(idChnl, idfsel);
      desc99.putReference(idnull, ref33);
      var idT = charIDToTypeID('T   ');
        var desc100 = new ActionDescriptor();
        var idTop = charIDToTypeID('Top ');
        var idPxl = charIDToTypeID('#Pxl');
        desc100.putUnitDouble(idTop, idPxl, newEdgeY);
        var idLeft = charIDToTypeID('Left');
        var idPxl = charIDToTypeID('#Pxl');
        desc100.putUnitDouble(idLeft, idPxl, newEdgeX+newEdgeWidth/2);
        var idBtom = charIDToTypeID('Btom');
        var idPxl = charIDToTypeID('#Pxl');
        desc100.putUnitDouble(idBtom, idPxl, newEdgeY+newEdgeHeight);
        var idRght = charIDToTypeID('Rght');
        var idPxl = charIDToTypeID('#Pxl');
        desc100.putUnitDouble(idRght, idPxl, newEdgeX+newEdgeWidth);
      var idRctn = charIDToTypeID('Rctn');
      desc99.putObject(idT, idRctn, desc100);
    executeAction(idIntW, desc99, DialogModes.NO);
  }
  var rightClip;
  // try to save the width of the selection
  try {
    rightClip = (newEdgeX+newEdgeWidth)-parseInt(thisDocument.selection.bounds[0]);
  } catch (e) {
    rightClip = 0;
  }
  if (rightClip != 0) {
    // if there is a selection intersect it to remove the calculated top and bottom
    var idIntW = charIDToTypeID('IntW');
      var desc101 = new ActionDescriptor();
      var idnull = charIDToTypeID('null');
        var ref34 = new ActionReference();
        var idChnl = charIDToTypeID('Chnl');
        var idfsel = charIDToTypeID('fsel');
        ref34.putProperty(idChnl, idfsel);
      desc101.putReference(idnull, ref34);
      var idT = charIDToTypeID('T   ');
        var desc102 = new ActionDescriptor();
        var idTop = charIDToTypeID('Top ');
        var idPxl = charIDToTypeID('#Pxl');
        desc102.putUnitDouble(idTop, idPxl, newEdgeY+topClip);
        var idLeft = charIDToTypeID('Left');
        var idPxl = charIDToTypeID('#Pxl');
        desc102.putUnitDouble(idLeft, idPxl, newEdgeX);
        var idBtom = charIDToTypeID('Btom');
        var idPxl = charIDToTypeID('#Pxl');
        desc102.putUnitDouble(idBtom, idPxl, newEdgeY+newEdgeHeight-bottomClip);
        var idRght = charIDToTypeID('Rght');
        var idPxl = charIDToTypeID('#Pxl');
        desc102.putUnitDouble(idRght, idPxl, newEdgeX+newEdgeWidth);
      var idRctn = charIDToTypeID('Rctn');
      desc101.putObject(idT, idRctn, desc102);
    executeAction(idIntW, desc101, DialogModes.NO);
  }
  var rightClipTopBottomClipped;
  // try to save the width of the selection
  try {
    rightClipTopBottomClipped = (newEdgeX+newEdgeWidth)-parseInt(thisDocument.selection.bounds[0]);
  } catch (e) {
    rightClipTopBottomClipped = 0;
  }
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // get ready to store coordinates
  var finalX;
  var finalY;
  var finalWidth;
  var finalHeight;
  // calculate larger area and store their coordinates
  if ((newEdgeWidth-leftClip-rightClip)*(newEdgeHeight-topClipSidesClipped-bottomClipSidesClipped) > (newEdgeWidth-leftClipTopBottomClipped-rightClipTopBottomClipped)*(newEdgeHeight-topClip-bottomClip)) {
    finalX = newEdgeX+leftClip;
    finalY = newEdgeY+topClipSidesClipped;
    finalWidth = newEdgeWidth-leftClip-rightClip;
    finalHeight = newEdgeHeight-topClipSidesClipped-bottomClipSidesClipped;
  } else {
    finalX = newEdgeX+leftClipTopBottomClipped;
    finalY = newEdgeY+topClip;
    finalWidth = newEdgeWidth-leftClipTopBottomClipped-rightClipTopBottomClipped;
    finalHeight = newEdgeHeight-topClip-bottomClip;
  }
  // intersect selection with final left clip rectangle
  var idIntW = charIDToTypeID('IntW');
    var desc103 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref35 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref35.putProperty(idChnl, idfsel);
    desc103.putReference(idnull, ref35);
    var idT = charIDToTypeID('T   ');
      var desc104 = new ActionDescriptor();
      var idTop = charIDToTypeID('Top ');
      var idPxl = charIDToTypeID('#Pxl');
      desc104.putUnitDouble(idTop, idPxl, finalY);
      var idLeft = charIDToTypeID('Left');
      var idPxl = charIDToTypeID('#Pxl');
      desc104.putUnitDouble(idLeft, idPxl, edgeX);
      var idBtom = charIDToTypeID('Btom');
      var idPxl = charIDToTypeID('#Pxl');
      desc104.putUnitDouble(idBtom, idPxl, finalY+finalHeight);
      var idRght = charIDToTypeID('Rght');
      var idPxl = charIDToTypeID('#Pxl');
      desc104.putUnitDouble(idRght, idPxl, finalX);
    var idRctn = charIDToTypeID('Rctn');
    desc103.putObject(idT, idRctn, desc104);
  executeAction(idIntW, desc103, DialogModes.NO);
  var selectionBoundary;
  // try to save the boundary of the selection
  try {
    selectionBoundary = parseInt(thisDocument.selection.bounds[2]);
  } catch (e) {
    selectionBoundary = edgeX;
  }
  // calculate how much we can expand on the left
  var expansionLeft = finalX-selectionBoundary;
  finalX -= expansionLeft;
  finalWidth += expansionLeft;
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect selection with final top clip rectangle
  var idIntW = charIDToTypeID('IntW');
    var desc105 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref36 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref36.putProperty(idChnl, idfsel);
    desc105.putReference(idnull, ref36);
    var idT = charIDToTypeID('T   ');
      var desc106 = new ActionDescriptor();
      var idTop = charIDToTypeID('Top ');
      var idPxl = charIDToTypeID('#Pxl');
      desc106.putUnitDouble(idTop, idPxl, edgeY);
      var idLeft = charIDToTypeID('Left');
      var idPxl = charIDToTypeID('#Pxl');
      desc106.putUnitDouble(idLeft, idPxl, finalX);
      var idBtom = charIDToTypeID('Btom');
      var idPxl = charIDToTypeID('#Pxl');
      desc106.putUnitDouble(idBtom, idPxl, finalY);
      var idRght = charIDToTypeID('Rght');
      var idPxl = charIDToTypeID('#Pxl');
      desc106.putUnitDouble(idRght, idPxl, finalX+finalWidth);
    var idRctn = charIDToTypeID('Rctn');
    desc105.putObject(idT, idRctn, desc106);
  executeAction(idIntW, desc105, DialogModes.NO);
  var selectionBoundary;
  // try to save the boundary of the selection
  try {
    selectionBoundary = parseInt(thisDocument.selection.bounds[3]);
  } catch (e) {
    selectionBoundary = edgeY;
  }
  // calculate how much we can expand on the top
  var expansionTop = finalY-selectionBoundary;
  finalY -= expansionTop;
  finalHeight += expansionTop;
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect selection with final right clip rectangle
  var idIntW = charIDToTypeID('IntW');
    var desc107 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref37 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref37.putProperty(idChnl, idfsel);
    desc107.putReference(idnull, ref37);
    var idT = charIDToTypeID('T   ');
      var desc108 = new ActionDescriptor();
      var idTop = charIDToTypeID('Top ');
      var idPxl = charIDToTypeID('#Pxl');
      desc108.putUnitDouble(idTop, idPxl, finalY);
      var idLeft = charIDToTypeID('Left');
      var idPxl = charIDToTypeID('#Pxl');
      desc108.putUnitDouble(idLeft, idPxl, finalX+finalWidth);
      var idBtom = charIDToTypeID('Btom');
      var idPxl = charIDToTypeID('#Pxl');
      desc108.putUnitDouble(idBtom, idPxl, finalY+finalHeight);
      var idRght = charIDToTypeID('Rght');
      var idPxl = charIDToTypeID('#Pxl');
      desc108.putUnitDouble(idRght, idPxl, edgeX+edgeWidth);
    var idRctn = charIDToTypeID('Rctn');
    desc107.putObject(idT, idRctn, desc108);
  executeAction(idIntW, desc107, DialogModes.NO);
  var selectionBoundary;
  // try to save the boundary of the selection
  try {
    selectionBoundary = parseInt(thisDocument.selection.bounds[0]);
  } catch (e) {
    selectionBoundary = edgeX+edgeWidth;
  }
  // calculate how much we can expand on the right
  var expansionRight = selectionBoundary-(finalX+finalWidth);
  finalWidth += expansionRight;
  // revert the selection intersection
  thisDocument.activeHistoryState = beforeIntersection;
  // intersect selection with final bottom clip rectangle
  var idIntW = charIDToTypeID('IntW');
    var desc109 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref38 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref38.putProperty(idChnl, idfsel);
    desc109.putReference(idnull, ref38);
    var idT = charIDToTypeID('T   ');
      var desc110 = new ActionDescriptor();
      var idTop = charIDToTypeID('Top ');
      var idPxl = charIDToTypeID('#Pxl');
      desc110.putUnitDouble(idTop, idPxl, finalY+finalHeight);
      var idLeft = charIDToTypeID('Left');
      var idPxl = charIDToTypeID('#Pxl');
      desc110.putUnitDouble(idLeft, idPxl, finalX);
      var idBtom = charIDToTypeID('Btom');
      var idPxl = charIDToTypeID('#Pxl');
      desc110.putUnitDouble(idBtom, idPxl, edgeY+edgeHeight);
      var idRght = charIDToTypeID('Rght');
      var idPxl = charIDToTypeID('#Pxl');
      desc110.putUnitDouble(idRght, idPxl, finalX+finalWidth);
    var idRctn = charIDToTypeID('Rctn');
    desc109.putObject(idT, idRctn, desc110);
  executeAction(idIntW, desc109, DialogModes.NO);
  var selectionBoundary;
  // try to save the boundary of the selection
  try {
    selectionBoundary = parseInt(thisDocument.selection.bounds[1]);
  } catch (e) {
    selectionBoundary = edgeY+edgeHeight;
  }
  // calculate how much we can expand on the bottom
  var expansionBottom = selectionBoundary-(finalY+finalHeight);
  finalHeight += expansionBottom;
  // select our final opaque area
  var idsetd = charIDToTypeID('setd');
    var desc111 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref39 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref39.putProperty(idChnl, idfsel);
    desc111.putReference(idnull, ref39);
    var idT = charIDToTypeID('T   ');
      var desc112 = new ActionDescriptor();
      var idTop = charIDToTypeID('Top ');
      var idPxl = charIDToTypeID('#Pxl');
      desc112.putUnitDouble(idTop, idPxl, finalY);
      var idLeft = charIDToTypeID('Left');
      var idPxl = charIDToTypeID('#Pxl');
      desc112.putUnitDouble(idLeft, idPxl, finalX);
      var idBtom = charIDToTypeID('Btom');
      var idPxl = charIDToTypeID('#Pxl');
      desc112.putUnitDouble(idBtom, idPxl, finalY+finalHeight);
      var idRght = charIDToTypeID('Rght');
      var idPxl = charIDToTypeID('#Pxl');
      desc112.putUnitDouble(idRght, idPxl, finalX+finalWidth);
    var idRctn = charIDToTypeID('Rctn');
    desc111.putObject(idT, idRctn, desc112);
  executeAction(idsetd, desc111, DialogModes.NO);
  // crop the image
  var idCrop = charIDToTypeID('Crop');
    var desc113 = new ActionDescriptor();
    var idDlt = charIDToTypeID('Dlt ');
    desc113.putBoolean(idDlt, true);
  executeAction(idCrop, desc113, DialogModes.NO);
  // deselect the selection
  var idsetd = charIDToTypeID('setd');
    var desc114 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
      var ref40 = new ActionReference();
      var idChnl = charIDToTypeID('Chnl');
      var idfsel = charIDToTypeID('fsel');
      ref40.putProperty(idChnl, idfsel);
    desc114.putReference(idnull, ref40);
    var idT = charIDToTypeID('T   ');
    var idOrdn = charIDToTypeID('Ordn');
    var idNone = charIDToTypeID('None');
    desc114.putEnumerated(idT, idOrdn, idNone);
  executeAction(idsetd, desc114, DialogModes.NO);
  // restore the ruler units preference
  app.preferences.rulerUnits = startRulerUnits;
  // restore the state of displaying dialogs
  app.displayDialogs = startDisplayDialogs;
} catch (e) {
  // try to restore the ruler units preference
  try {
    // if we saved the ruler units preference...
    if (restoreRulerUnits) {
      // ...then restore it
      app.preferences.rulerUnits = startRulerUnits;
    }
  } catch (e) {
  }
  // try to restore the state of displaying dialogs
  try {
    // if we saved the state of displaying dialogs...
    if (restoreDisplayDialogs) {
      // ...then restore it
      app.displayDialogs = startDisplayDialogs;
    }
  } catch (e) {
  }
  try {
    // localize the 'user cancelled the operation' string
    var userCanceledString = localize('$$$/ScriptingSupport/Error/UserCancelled=User cancelled the operation');
    // test if the error message contains the above string
    if (e.toString().indexOf(userCanceledString) == - 1) {
      // if the user did not cancel the operation re-throw the exception to be caught below
      throw e;
    } else {
      // otherwise alert the user that they cancelled the operation
      scriptAlert("Photoshop", userCanceledString, "");
      //alert(userCanceledString);
    }
  } catch (e) {
    try {
      // alert the user that something went wrong
      //scriptAlert("Photoshop", "", "");
      //alert('Script failed');
    } catch (e) {
    }
  }
}



function scriptAlert(alertTitle, alertString1, alertString2) {
    var alertWindow = new Window("dialog", undefined, undefined, {resizeable: false});
        alertWindow.text = alertTitle;
        alertWindow.preferredSize.width = 300;
        alertWindow.preferredSize.height = 100;
        alertWindow.orientation = "column";
        alertWindow.alignChildren = ["center", "top"];
        alertWindow.spacing = 25;
        alertWindow.margins = 20;
    var alertText = alertWindow.add("group");
        alertText.orientation = "column";
        alertText.alignChildren = ["left", "center"];
        alertText.spacing = 0;
        alertText.alignment = ["left", "top"];
        alertStringSize1 = alertText.add("statictext", undefined, alertString1, {name: "alertText", multiline: true});
        alertStringSize1.graphics.font = ScriptUI.newFont ("dialog", "BOLD", 13);
        alertStringSize2 = alertText.add("statictext", undefined, alertString2, {name: "alertText", multiline: true});
        alertStringSize2.graphics.font = "dialog:13";
    var okButton = alertWindow.add("button", undefined, undefined, {name: "okButton"});
        okButton.text = "OK";
        okButton.alignment = ["left", "top"];
        okButton.graphics.font = "dialog:13";
    
    alertWindow.show();
}
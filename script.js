function onFormSubmit(e) {
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var data = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];


  var timestamp = new Date(data[1]);
  var day = ("1" + timestamp.getDate()).slice(-2);
  var month = ("1" + (timestamp.getMonth() + 1)).slice(-2);
  var year = timestamp.getFullYear();
  var sheetName = day + "-" + month + "-" + year; 

  var ss = sheet.getParent();
  var targetSheet = ss.getSheetByName(sheetName);


  if (!targetSheet) {
    targetSheet = ss.insertSheet(sheetName);
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();
    targetSheet.getRange(1, 1, 1, headers[0].length).setValues(headers);
  }


  targetSheet.appendRow(data);

  var lastRow = targetSheet.getLastRow();
  var value = data[3];
  if (value) {
    var allData = targetSheet.getRange(2, 4, lastRow - 1, 1).getValues();
    for (var i = 0; i < allData.length - 1; i++) {
      // Compare as numbers only
      if (Number(allData[i][0]) == Number(value)) {
        targetSheet.deleteRow(lastRow); 
        break;
      }
    }
  }
}



var wbook = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1-YxE-dMDJkyyBFazHzXFJZoaFgYf4_Vvxjo7UYzGg-Q/edit?usp=sharing')

var sheet = wbook.getSheetByName('Sheet1')
function doGet(e){
  const usernameQuery = e.parameter.query;
  const  range = sheet.getDataRange().getValues();
  range.shift();
  let output = []
  range.map((element)=>{
    let row = {}
    row['ID'] = element[0]
    row['Username'] = element[1]
    row['Link'] = element[2]
    row['Title'] = element[3]
    row['Status'] = element[4]
    row['Level'] = element[5]
    row['Accuracy'] = element[6]
    row['Time'] = element[7]
    row['Code'] = element[8]
    row['Lang'] = element[9]
    row['Date'] = element[10]
    row['Score'] = element[11]
    row['TotalResults'] = range.length
    output.push(row)
  })

// To sort output in descending order
  output.sort((objA, objB)=> {
    return (objB['ID'] - objA['ID']);
  })

// Filter --> By Username --> usernameQuery
  const filterOutput = output.filter((obj)=> obj['Username']== usernameQuery);
  return ContentService.createTextOutput(JSON.stringify(filterOutput)).setMimeType(ContentService.MimeType.JSON);
}

// function doGet(e) {
//   const  range = sheet.getDataRange().getValues();
//   console.log(range)
//   let page = e.parameter.page || 1;
//   let limit = e.parameter.limit || 15;
//   return getRes(sheet, page, limit);
// }

// function getRes(sheet, page, limit){
//   let rows = sheet.getDataRange().getValues();
//   rows.shift();
//   let totolResults = rows.length;
//   let output = rows.splice(limit * (page -1),limit).reduce((arr,[id, username, link, title, status, level, accuracy, time, code, lang, date, score]) => arr.concat([{'ID': id,'Username': username, 'Link': link,'Title': title,'Status': status,'Level': level,'Accuracy': accuracy,'Time': time,'Code': code,'Lang': lang,'Date': date,'Score': score, 'totalResults':totolResults}]),[])
//   return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(ContentService.MimeType.JSON)
// }

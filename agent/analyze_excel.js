const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'First Phase Allotment.xlsx');
const workbook = XLSX.readFile(filePath);

const results = {};

workbook.SheetNames.forEach(sheetName => {
    if (sheetName === 'REPORT') return;
    
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    let maxRank = 0;
    data.forEach(row => {
        const rank = parseFloat(row[2]);
        if (!isNaN(rank) && rank > maxRank) {
            maxRank = rank;
        }
    });
    
    results[sheetName] = {
        code: sheetName,
        cutoff: maxRank
    };
});

console.log("JSON_START");
console.log(JSON.stringify(results, null, 2));
console.log("JSON_END");

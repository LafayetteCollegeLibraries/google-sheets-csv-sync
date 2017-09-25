const pmap = require('p-map')
const getSheetNames = require('./get-sheet-names')
const getSheetData = require('./get-sheet-data')
const writeSpreadsheetData = require('./write-spreadsheet-data')

module.exports = async (token, sheet_id, output_directory) => {
  const writeDataFromName = async name => {
    const data = await getSheetData(token, sheet_id, name)
    return writeSpreadsheetData(output_directory, name, data)
  }

  const names = await getSheetNames(token, sheet_id)

  return pmap(names, writeDataFromName)
}

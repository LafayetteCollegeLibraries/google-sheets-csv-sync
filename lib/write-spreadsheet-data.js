const fs = require('fs')
const path = require('path')

const csvWriter = require('csv-write-stream')

module.exports = (_directory, _name, _data) => new Promise((resolve, reject) => {
  let dir, data, name

  // writeSpreadsheetData('sheetname', [])
  if (Array.isArray(_name) && !_data) {
    dir = './'
    name = _directory
    data = _name
  }

  else {
    dir = _directory
    name = _name
    data = _data
  }

  const outputPath = path.join(path.resolve(dir), name + '.csv')
  const output = fs.createWriteStream(outputPath)

  const headers = data[0]
  const writer = csvWriter({headers})
  
  writer.pipe(output)
  writer.on('error', err => reject(err))

  for (let i = 1; i < data.length; i++) {
    writer.write(data[i])
  }

  writer.end()

  // resolve _after_ the writer finishes up
  output.on('close', () => resolve(outputPath))
})

const https = require('https')
const concat = require('concat-stream')
const csvWriter = require('csv-write-stream')

module.exports = (token, sheet_id, name) => new Promise((resolve, reject) => {
  const concatStream = concat({encoding: 'buffer'}, buffer => {
    const results = buffer.toString()

    try {
      const parsed = JSON.parse(results)

      if (parsed.error) {
        return reject(parsed.error)
      }

      const vranges = parsed.valueRanges || [{values: []}]
      const values = vranges[0].values

      return resolve(values)
    }

    catch (err) {
      return reject(err)
    } 
  })

  const opts = {
    method: 'GET',
    host: 'sheets.googleapis.com',
    path: `/v4/spreadsheets/${sheet_id}/values:batchGet?ranges=${name}&majorDimension=ROWS`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const req = https.request(opts, res => {
    res.pipe(concatStream)
    res.on('error', err => reject(err))
  })

  req.on('error', err => reject(err))
  req.end()
})

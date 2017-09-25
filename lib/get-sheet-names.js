const https = require('https')
const url = require('url')
const concat = require('concat-stream')

module.exports = (token, sheet_id) => new Promise((resolve, reject) => {
  const opts = {
    method: 'GET',
    host: 'sheets.googleapis.com',
    path: `/v4/spreadsheets/${sheet_id}`,
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }

  const concatStream = concat({encoding: 'buffer'}, bufferResults => {
    const results = bufferResults.toString()

    try {
      const parsed = JSON.parse(results)
      
      if (parsed.error) {
        return reject(parsed.error)
      }

      if (!parsed.sheets) {
        return reject(new Error('no sheets found'))
      }

      const mapped = parsed.sheets.map(s => s.properties.title)
      return resolve(mapped)
    }

    catch (err) {
      return reject(err)
    }
  })

  const req = https.request(opts, res => {
    res.pipe(concatStream)
    res.on('error', e => reject(e))
  })
  
  req.on('error', e => reject(e))
  req.end()
})

const util = require('util')
const getGoogleToken = require('./lib/get-google-token')
const sync = require('./lib/sync-files')
const commit = require('./lib/commit')

module.exports = async config => {
  const { drive_info, spreadsheet_id, output_dir } = config

  try {
    const token = await getGoogleToken(drive_info)
    const syncdPaths = await sync(token, spreadsheet_id, output_dir)
    
    if (config.commit) {
      const msg = config.commit_message
      const committed = await commit(output_dir, msg)
    }

    return Promise.resolve(syncdPaths)
  } catch (err) {
    return Promise.reject(err)
  }
}

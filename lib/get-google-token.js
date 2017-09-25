const GoogleToken = require('gtoken')

module.exports = (_config, _scope) => new Promise((resolve, reject) => {
  const config = {
    email: _config.client_email,
    key: _config.private_key,
    scope: _scope || ['https://www.googleapis.com/auth/drive.readonly'],
  }

  const gtoken = new GoogleToken(config)
  gtoken.getToken((err, token) => {
    if (err) {
      return reject(err)
    }

    return resolve(token)
  })
})

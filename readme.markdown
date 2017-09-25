google-sheets-csv-sync
======================

Writes data from Google Spreadsheet to csv files and (optionally) uses git to
commit the changes.

usage
-----

```javascript
const { client_email, private_key } = require('./config_secret.json')
const config = {
  drive_info: { client_email, private_key },
  spreadsheet_id: 'abcd_efghi-jklmnopqrstuvwxyz_0123456-789',
  output_dir: '/path/to/output/directory',

  // these are optional
  commit: true,
  commit_message: 'ayo, here is an automated commit'
}

sync(config)
  .then(paths => console.log('write to:', pahts))
  .catch(err => console.warn(err))
```

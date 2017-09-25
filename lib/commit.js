// TODO: prevent error from being thrown when nothing to commit
const path = require('path')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

const defaultMessage = 'automated commit'

module.exports = async (directory, msg) => {
  const dir = path.resolve(directory || '.')
  const gitdir = path.resolve(dir, '.git')
  const alldir = path.resolve(dir, '*')
  const git = `git --git-dir=${gitdir} --work-tree=${dir}`
  
  const message = msg || defaultMessage

  const { aout, awarn } = await exec(`${git} add .`)
  const { cout, cwarn } = await exec(`${git} commit -m "${message}"`)

  return Promise.resolve(cout)
}

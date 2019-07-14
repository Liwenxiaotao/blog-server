const path = require('path')
const fs = require('fs')

function log(filename, text) {
  const filePath = getFullPath(filename)
  const writeStream = fs.createWriteStream(filePath, {
    flags: 'a'
  })
  writeStream.write(`${text}\n`)
}

function getFullPath(filename) {
  return path.resolve(__dirname, `../../log/${filename}`)
}

module.exports = {
  log
}
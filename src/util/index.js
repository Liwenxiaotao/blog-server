const _ = require('lodash')

const getPostData = (req) => {
  const promiss = new Promise((resolve, reject) => {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if(!postData) {
        return resolve({})
        
      }
      return resolve(JSON.parse(postData))
    })
  })
  return promiss
}

const cookie = (cookie) => {
  const res = {}
  if(cookie) {
    const cookies = cookie.split(';')
    cookies.forEach((c) => {
      const entry = c.split('=')
      const key = _.trim(entry[0])
      const val = _.trim(entry[1])
      res[key] = val
    });
  }
  return res
}

const sessionId = () => {
  return `${Date.now()}_${Math.random()}`
}

module.exports = {
  getPostData,
  cookie,
  sessionId
}
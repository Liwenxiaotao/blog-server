const quertString = require('querystring')
const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')
const { getPostData, cookie, sessionId } = require('./src/util')
const { log } = require('./src/util/log')

const sessionList = {}

const serverHandle = (req, res) => {
  const url = req.url
  const path = url.split('?')[0]
  req.query = quertString.parse(url.split('?')[1])

  // 获取cookie、session
  req.cookie = cookie(req.headers['cookie'])
  let sid, setSId = false
  if(req.cookie.sid && sessionList[req.cookie.sid]) {
    sid = req.cookie.sid
  } else {
    sid = sessionId()
    sessionList[sid] = {}
    setSId = true
  }
  req.session = sessionList[sid]

  res.setHeader('Content-Type', 'application/json')
  
  getPostData(req).then((postData) => {
    log('access.log', `${req.method}--${url}--${req.headers['user-agent']}`)

    req.body = postData

    const blogData = blogRouter(req, res);
    if (blogData) {
      blogData.then((result) => {
        if(setSId) {
          res.setHeader('Set-Cookie', `sid=${sid}; path=/; httpOnly`)
        }
        res.end(JSON.stringify(result))
      })
      return
    }

    const userData = userRouter(req, res)
    if (userData) {
      userData.then((result) => {
        if(setSId) {
          res.setHeader('Set-Cookie', `sid=${sid}; path=/; httpOnly`)
        }
        res.end(JSON.stringify(result))
      })
      return
    }

    res.writeHeader(404, {
      'Content-Type' : 'text/plain'
    })
    res.end('404 Not Fiund')
  })
}

module.exports = serverHandle
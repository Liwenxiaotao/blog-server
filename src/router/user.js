const { login } = require('../controller/login')
const { SuccsssModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method.toLowerCase()
  const url = req.url
  const path = url.split('?')[0]

  // 登录
  if (method === 'get' && path === '/api/user/login') {
    const result = login(req.query)
    return result.then((data) => {
      if(data && data.username) {
        req.session.username = data.username
        req.session.realname = data.realname
        return new SuccsssModel('登录成功')
      } 
      return new ErrorModel('登录失败')
    })
  }

  // 检查登录状态
  if (method === 'get' && path === '/api/user/check') {
    if(req.session.username) {
      return Promise.resolve(new SuccsssModel(`登录用户：${req.cookie.username}`))
    }
    return Promise.resolve(new ErrorModel('暂未登录'))
  }
}

module.exports = handleUserRouter
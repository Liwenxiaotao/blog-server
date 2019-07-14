const { getList, getDetail, addBlog, updateBlog, daleteBlog } = require('../controller/blog')
const { SuccsssModel, ErrorModel } = require('../model/resModel')

const loginCheck = (req) => {
  if(!req.session.username) {
    return Promise.resolve(new ErrorModel('暂未登录'))
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method.toLowerCase()
  const url = req.url
  const path = url.split('?')[0]
  
  // 获取博客列表
  if (method === 'get' && path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const data = getList(author, keyword)
    // return new SuccsssModel(data)
    const result = getList(author, keyword)
    return result.then((data) => {
      return new SuccsssModel(data)
    })
  }

  // 获取博客详情
  if (method === 'get' && path === '/api/blog/detail') {
    const id = req.query.id
    // const data = getDetail(id)
    // return new SuccsssModel(data)
    const result = getDetail(id)
    return result.then((data) => {
      return new SuccsssModel(data)
    })
  }

  // 新增博客
  if (method === 'post' && path === '/api/blog/add') {

    // 登录验证
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) return loginCheckResult

    const result = addBlog(req.body)
    // if(result) {
    //   return new SuccsssModel('新增成功')
    // } else {
    //   return new ErrorModel('新增失败')
    // }
    return result.then((data) => {
      return data ? new SuccsssModel('新增成功') : new ErrorModel('新增失败')
    })
  }

  // 修改博客
  if (method === 'post' && path === '/api/blog/update') {

    // 登录验证
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) return loginCheckResult

    const result = updateBlog(req.body)
    return result.then((data) => {
      return data ? new SuccsssModel('修改成功') : new ErrorModel('修改失败')
    })
  }

  // 删除博客
  if (method === 'post' && path === '/api/blog/delete') {

    // 登录验证
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) return loginCheckResult
    
    const result = daleteBlog(req.body)
    return result.then((data) => {
      return data ? new SuccsssModel('删除成功') : new ErrorModel('删除失败')
    })
  }
}

module.exports = handleBlogRouter
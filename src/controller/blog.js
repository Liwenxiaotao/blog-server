const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1`
  if (author) {
    sql += ` and author='${author}'`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  sql += ` order by createtime desc`
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then((data) => {
    return data[0]
  })
}

const addBlog = (blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()
  const sql = `
    insert into blogs (title, content, author, createtime)
    value ('${title}', '${content}', '${author}', ${createtime});
  `
  return exec(sql).then((data) => {
    return !!data.insertId
  })

}

const updateBlog = (blogData = {}) => {
  const id = blogData.id
  const title = blogData.title
  const content = blogData.content
  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `
  return exec(sql).then((data) => {
    return !!data.affectedRows
  })
}

const daleteBlog = (blogData = {}) => {
  const id = blogData.id
  const sql = `
    delete from blogs where id='${id}'
  `
  return exec(sql).then((data) => {
    return !!data.affectedRows
  })
}

module.exports = {
  getList,
  getDetail,
  addBlog,
  updateBlog,
  daleteBlog
}
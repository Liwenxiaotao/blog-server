const env = process.env.NODE_ENV

let MYSQL_CONF
let Redis_conf

if(env === 'dev') {
  // mysql配置
  MYSQL_CONF = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'myblog'
  }

  // Redis配置
  Redis_conf = {
    port: 6379,
    host: '127.0.0.1'
  }
} else if(env === 'pro') {
  MYSQL_CONF = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'myblog'
  }

  Redis_conf = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  Redis_conf
}


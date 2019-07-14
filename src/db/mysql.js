const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf')

var connection = mysql.createConnection(MYSQL_CONF);

connection.connect();

function exec(sql) {
  const promise = new Promise(function(resolve, reject) {
    connection.query(sql, function (error, results, fields) {
      if (error) reject(error);
      resolve(results)
    });
  })
  return promise
}

module.exports = {
  exec
}
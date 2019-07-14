const redis = require('redis')
const { redisConf } = require('../conf')

const client = redis.createClient(redisConf.port, redisConf.host)

client.on('error', (err) => {
  console.error(err)
})

function set(key, val) {
  if(typeof val === 'object') {
    val = JSON.stringify(val)
  }
  client.set(key, val, redis.print)
}

function get(key) {
  const promiss = new Promise((resolve, reject) => {
    client.get(key, (err, val) => {
      if(err) return reject(err)
      if(val === null) return resolve(null)
      try {
        resolve(JSON.parse(val))
      } catch(err) {
        return resolve(val)
      }
    })
  })
  return promiss
}

module.exports = {
  set,
  get
}
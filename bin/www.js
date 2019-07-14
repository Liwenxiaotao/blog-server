const http = require('http')
const serverHandle = require('../app')
const port = 8888

const server = http.createServer(serverHandle)

server.listen(port, () => {
  console.log(8888)
})
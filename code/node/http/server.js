const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {

  res.on('finish', () => {
    console.log('response finish')
  })

  res.on('close', () => {
    console.log('response end')
  })

  console.log(res.finished)

  res.statusCode = 400

  res.setHeader('set-cookie', 'sessionid=123;path=/;httponly')

  console.log(res.getHeaders())

  if (req.url === '/ping') {
    res.write('pong')
    res.end()
  } else {
    res.end('/')
  }
})

server.listen(3000, () => {
  console.log('server is running at localhost:3000')
})

server.on('error', error => {
  console.log(error)
})

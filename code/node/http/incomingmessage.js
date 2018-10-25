const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    res.end()
    req.on('end', () => {
        console.log('end')
    })
    console.log('http版本')
    console.log(req.httpVersion)
    console.log('请求方法')
    console.log(req.httpVersion)
    console.log('请求头')
    console.log(req.headers)
})

server.listen(3000, () => {
  console.log('server is running at localhost:3000')
})

server.on('error', error => {
  console.log(error)
})

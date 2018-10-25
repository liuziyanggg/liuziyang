const http = require('http')

const options = {
  host: 'liuziyang.top',
  path: '/api/article'
}

const request = http.get(options, res => {
  res.on('data', chunk => {
    console.log(chunk)
  })
})

request.on('connect', (res, socket, head) => {
  console.log('connect')
})


request.on('socket', (socket) => {
  console.log('socket')
})

request.on('information', (res, socket, head) => {
  console.log('information')
})



request.on('response', (res) => {
  console.log('response')
})

request.on('error', error => {
  console.error(error)
})

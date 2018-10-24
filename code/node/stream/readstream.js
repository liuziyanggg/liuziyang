const http = require('http')
const fs = require('fs')
const writer = fs.createWriteStream('./1.json')


writer.on('pipe', data => {
console.log('pipe') 
})

const options = {
  host: 'liuziyang.top',
  path: '/api/article?size=25',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

const request = http.request(options, res => {
  res.pipe(writer)
  setTimeout(() => {
    console.log('Stop writing to file.txt');
    res.unpipe(writer);
    console.log('Manually close the file stream');
    writer.end();
  }, 1000);
})

request.on('response', res => {
  console.log('触发响应')
})

request.on('close', () => {
  console.log('close')
})

request.on('error', error => {
  console.log(error)
  console.log('出错了')
})

request.end()

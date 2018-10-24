const fs = require('fs')

const stream = fs.createWriteStream('./1.txt')

stream.on('close', err => {
  console.log('close')
  console.log(err)
  console.log()
})

stream.on('drain', err => {
  console.log('drain')
  console.log(err)
  console.log()
})


stream.on('error', err => {
  console.log('error')
  console.log(err)
  console.log()
})

stream.on('finish', err => {
  console.log('finish')
  console.log(err)
  console.log()
})

stream.on('pipe', err => {
  console.log('pipe')
  console.log(err)
  console.log()
})


stream.cork()

stream.write('123456789')
console.log(stream.writableLength)

stream.uncork()
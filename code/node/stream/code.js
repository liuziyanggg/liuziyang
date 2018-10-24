const fs = require('fs')

const writable = fs.createWriteStream('./code.txt')

writable.cork()

writable.write('123')

writable.write('456')

console.log(writable.writableBuffer)

console.log(writable.writableLength)

// writable.uncork()
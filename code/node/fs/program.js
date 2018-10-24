var fs = require('fs')

fs.readFile('./1.txt', function(err, data) {
  if (err) throw Error(err)
  console.log(data) 
})
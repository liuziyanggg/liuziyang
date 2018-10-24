var fs = require('fs')

fs.mkdir('./b/t/t', { recursive: true }, err => {
    console.log(err)
})
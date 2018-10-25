#### http 模块 -- http.IncomingMessage类

`http.IncomingMessage`对象由`http.server`或者是`http.clientRequest`创建，并作为第一个参数分别传递给`'request'`事件和`'response'`事件。可以用来访问响应状态、消息头以及数据。

```js
const http = require('http')
const options = {}
const client = http.request(options)
client.on('response', res => {})   //  res 是http.IncomingMessage的一个实例

const server = http.createServer()

server.on('request', (req, res) => {})  //  req 是http.IncomingMessage的一个实例
```

#### `'aborted'`事件

当请求已被终止且网络已关闭时触发

##### `'close'`事件

当底层连接被关闭时触发。 同 `'end'` 事件一样，该事件每个响应只触发一次。

##### `message.aborted`

判断请求是否已被终止

##### message.destroy([error])

该方法会调用`socket`上的`destroy()`方法。如果提供了`error`参数，则会触发`'error'`事件，并将`error`参数传入事件监听器。

##### message.headers

获取请求头或者响应头对象

##### message.httpVersion

获取HTTP的版本

##### message.method

获取请求的方法，只能在`http.Server`中使用

##### message.rawHeaders

接收到的原始的请求头或响应头列表。键和值在同一个列表中。 偶数位的是键，奇数位的是对应的值。

头信息的名称不会被转换为小写，重复的也不会被合并。

### message.statusCode

仅在`http.ClientRequest`中有效，返回`HTTP`状态码

##### message.url

仅在`http.ClientRequest`中有效，返回请求中的URL，包括查询参数。

```js
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

```






#### 参考

[node中文文档 http模块](http://nodejs.cn/api/http.html)

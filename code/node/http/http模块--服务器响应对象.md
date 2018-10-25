#### http.ServerResponse类

该对象是在HTTP服务器内部被创建，作为第二个参数传入`'request'`事件。

##### `'close'事件`

当底层连接在 `response.end()`被调用或能够刷新之前被终止时触发。

##### `'finish'`事件

当响应已被发送是触发，当该事件触发之后，响应对象上不再触发其他事件。

##### `response.end([data][,encoding][,callback])`

- `data` 要写入响应对象的数据
- `encoding` 写入数据的编码格式
- `callback` 回调函数

该方法会通知服务器，所有的响应头和响应主体都已被发送，即服务器将其视为已完成。

当使用`data`和`encoding`参数时，相当于

```js
response.write(data, encoding)
response.end()
```

##### response.finished

返回一个布尔值，表示响应是否已经完成。

##### response.getHeader(name)

读取一个已经进入队列但尚未发送到客户端的响应头。名称不区分大小写。

##### response.getHeaderNames()

返回一个包含当前响应唯一名称的http头纤细名称的数组，名称均为小写。

##### response.getHeaders()

返回当前响应头文件的浅拷贝

##### response.hasHeader(name)

判断响应头是否有设置`name`头部

##### response.headersSent

判断响应头是否已经发送到客户端

##### response.removeHeader(name)

移除一个响应头

##### response.setHeader(name, value)

设置响应头

##### response.setTimeout(msecs[, callback])

设置响应的超时时间，如果提供了回调函数，则会作为监听器添加到响应对象的`timeout`事件。

##### response.statusCode

设置响应的状态码

##### response.statusMessage

设置响应的状态信息

##### `response.write(chunk[, encoding][, callback])`

该方法会发送一块响应主体

##### `response.writeHead(statusCode[, statusMessage][, headers])`

发送一个响应头给请求。

该方法在消息中只能被调用一次，且必须在 [`response.end()`](http://nodejs.cn/s/sqAtet) 被调用之前调用

```js
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {

  res.on('finish', () => {
    console.log('response finish')
  })

  res.on('close', () => {
    console.log('response end')
  })

  console.log(res.finished) // false

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

```

#### 参考

[node中文文档 http模块](http://nodejs.cn/api/http.html)
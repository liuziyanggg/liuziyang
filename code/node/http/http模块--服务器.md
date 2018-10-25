### http 模块 -- 服务器

http模块提供了简单的创建服务器的方法。

```js
const http = require('http')

const server = http.createServer(() => {
})

server.listen(3000)
```

这样就完成了一个服务器的创建。

#### `http.createServer([options][,requestListene])`

- options `<Object>`
  - `IncomingMessage` 指定要使用的 `IncomingMessage` 类，用于拓展原始的`IncomingMessage`类. **缺省:** `IncomingMessage`.
  - `ServerResponse` 指定要使用的 `ServerResponse`类， 用于拓展原始的`ServerResponse`类. **缺省:** `ServerResponse`.

- `requestListener` 回调函数，会自动添加到`'request'`事件上

返回一个新的 [`http.Server`](http://nodejs.cn/s/jLiRTh)实例。

#### http.Server类

`http.Server`类继承于`net.Server`

###### 常用事件

###### `'request'`事件

- `request` 请求对象
- `response` 响应对象

每次接收到一个请求时触发。 注意，每个连接可能有多个请求（在 HTTP `keep-alive` 连接的情况下）。

###### 'connection' 事件

- `request` HTTP 请求，同 [`'request'`](http://nodejs.cn/s/2qCn57) 事件。
- `socket` 服务器与客户端之间的网络 socket。
- `head` 流的第一个数据包，可能为空。

每当客户端发送 HTTP `CONNECT` 请求时触发。 如果该事件未被监听，则发送 `CONNECT` 请求的客户端会关闭连接。

当该事件被触发后，请求的 socket 上没有 `'data'` 事件监听器，这意味着需要绑定 `'data'` 事件监听器，用来处理 socket 上被发送到服务器的数据

###### 'close' 事件

当服务器关闭的时候触发

###### 'upgrade' 事件

- `request` HTTP 请求，同 [`'request'`](http://nodejs.cn/s/2qCn57) 事件。
- `socket` 服务器与客户端之间的网络 socket。
- `head`流的第一个数据包，可能为空。

每当客户端发送 HTTP `upgrade` 请求时触发。 如果该事件未被监听，则发送 `upgrade` 请求的客户端会关闭连接。

当该事件被触发后，请求的 socket 上没有 `'data'` 事件监听器，这意味着需要绑定 `'data'` 事件监听器，用来处理 socket 上被发送到服务器的数据。

###### server.close([callback])

停止服务端接受新的连接

###### `server.listen([port][,callback])`

开启HTTP服务器监听连接

###### server.listening

返回一个`boolean`值，表示服务器是否正在监听

###### server.maxHeadersCount

限制请求头的最大数量，默认为 2000。如果为0，则不做限制

###### `server.setTimeout([msecs][, callback])`

设置`socket` 超时时间，默认是`120000`（两分钟）。 如果发生超时，则触发服务器对象的 `'timeout'` 事件，并传入 socket 作为一个参数

###### server.timeout

可以用来获取`socket`超时时间或者是设置`socket`超时时间。当设置为`0`,表示禁用超时行为。

```js
// 例子
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  console.log(req.url)
  if (req.url === '/ping') {
    res.write('pong')
    res.end()
  } else {
    res.statusCode = 400
    res.end()
  }
})

server.listen(3000, () => {
  console.log('server is running at localhost:3000')
})

server.on('error', error => {
  console.log(error)
})

server.timeout = 1000
```



#### 参考

[node中文文档 http模块](http://nodejs.cn/api/http.html)


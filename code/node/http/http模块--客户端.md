### http 模块 -- 客户端

http模块可以作为服务器也可以作为客户端来使用，使用方式

```js
const http = require('http')
```



#### http.STATUS_CODES

返回标准HTTP状态码集合

#### http.METHODS

返回解析器支持的HTTP 方法列表

#### 客户端

##### http.clientRequest类

该对象在`http.request()`内部创建并返回，实现了可写流的接口。表示一个正在处理的请求，其请求头已经进入队列。请求头仍可使用 [`setHeader(name, value)`](http://nodejs.cn/s/ZBShBB)、[`getHeader(name)`](http://nodejs.cn/s/noVJNv) 和 [`removeHeader(name)`](http://nodejs.cn/s/vzuErq) API 进行修改。 实际的请求头会与第一个数据块一起发送或当调用 [`request.end()`](http://nodejs.cn/s/GAdV2u) 时发送。

##### `'abort'`事件

当请求被客户端终止时触发

###### `'connect'`事件

* `response`
* `socket`
* `head`

当服务器响应`CONNECT`请求是触发。如果该事件未被监听，则接收到`CONNECT`方法的客户端会关闭连接。

###### `'socket'`事件

当 socket 被分配到请求后触发。

###### `'timeout'`事件

当底层 socket 超时的时候触发。该方法只会通知空闲的 socket。请求必须手动停止

###### `'response事件'`

当请求的响应被接收到时触发。 该事件只触发一次。

在`response`事件期间，可以给响应对象添加监听器，比如监听`data`事件

###### `'upgrade'`事件

每当服务器响应 `upgrade` 请求时触发。 如果该事件未被监听，则接收到 `upgrade` 请求头的客户端会关闭连接

###### `request.abort()`

标记请求为终结。 调用该方法将使响应中剩余的数据被丢弃且 socket 被销毁。

###### request.aborted

如果请求被终结，该属性的值为请求被终结的时间。

###### `request.end([data[,encoding]][,callback])`

结束发送请求

###### request.flushHeaders()

刷新请求头

###### request.getHeader(name)

通过`name`读出请求头，`name`大小写敏感

###### request.removeHeader(name)

通过`name`移除已经在`headers`对象里面的header

###### request.setHeader(name, value)

设置`headers`中的header

###### request.setTimeout(timeout[, callback])

设置请求的超时时间，`callback`是超时发生时的回调，等同于绑定了`timeout`事件。

###### request.socket 和 request.connection

底层的`socket`

###### `request.write(chunk[, encoding][, callback])`

发送请求主体的一个数据块。 通过多次调用该方法，一个请求主体可被发送到一个服务器，在这种情况下，当创建请求时，建议使用 `['Transfer-Encoding', 'chunked']` 请求头

##### http.request(options[,callback])

- `options`  `<string> | <Object> | <URL>`
  - `protocol` 使用的协议。默认为 `http:`。
  - `host` 请求发送至的服务器的域名或 IP 地址。默认为 `localhost`。  * `hostname`是`host` 的别名。为了支持 [`url.parse()`](http://nodejs.cn/s/b28B2A)，`hostname` 优先于 `host`。
  - `family` 当解析 `host` 和 `hostname` 时使用的 IP 地址族。 有效值是 `4` 或 `6`。当未指定时，则同时使用 IP v4 和 v6。
  - `port` 远程服务器的端口。默认为 `80`。
  - `localAddress` 为网络连接绑定的本地接口。
  - `socketPath` Unix 域 Socket（使用 host:port 或 socketPath）。
  - `method` 指定 HTTP 请求方法的字符串。默认为 `'GET'`。
  - `path` 请求的路径。默认为 `'/'`。 应包括查询字符串（如有的话）。如 `'/index.html?page=12'`。 当请求的路径中包含非法字符时，会抛出异常。 目前只有空字符会被拒绝，但未来可能会变化。
  - `headers` 包含请求头的对象。
  - `auth` 基本身份验证，如 `'user:password'` 用来计算 `Authorization` 请求头。
  - `agent` 控制 [`Agent`](http://nodejs.cn/s/HRCnER) 的行为。 可能的值有：
    - `undefined` (默认): 对该主机和端口使用 [`http.globalAgent`](http://nodejs.cn/s/g7BhW2)。
    - `Agent` 对象：显式地使用传入的 `Agent`。
    - `false`: 创建一个新的使用默认值的 `Agent`。
  - `createConnection` 当不使用 `agent` 选项时，为请求创建一个 socket 或流。 这可以用于避免仅仅创建一个自定义的 `Agent` 类来覆盖默认的 `createConnection` 函数。详见 [`agent.createConnection()`](http://nodejs.cn/s/nH3X12)。 Any [`Duplex`](http://nodejs.cn/s/2iRabr) stream is a valid return value.
  - `timeout` 指定 socket 超时的毫秒数。 它设置了 socket 等待连接的超时时间。
- `callback`：回调函数
- 返回: `http.clientRequest类`

##### http.request(url[,options][,callback])`

* url `<string> | <URL>`
* 其他参数同`http.request`

当`url`是一个字符串时，会自动调用`url.parse()`转换成`URL`对象。并且会覆盖`options`中的属性。

##### `http.get(options[,callback])`和`http.get(url[,options][,callback])`
同`http.request`，区别是`http.get`不需要手动调用`request.end()`

```js
// 简单的例子
const http = require('http')

const options = {
  host: 'liuziyang.top',
  path: '/api/article'
}

const request = http.request(options, res => {
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
request.end(function () {
    console.log('发送请求')
})

```

#### 参考

[node中文文档 http模块](http://nodejs.cn/api/http.html)


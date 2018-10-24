### stream 模块

流(stream) 是nodejs中处理流式数据的抽象接口。流可以是可读的、可写的或者是可读可写的。所有的流都是`EventEmitter`的实例。使用方式：

```js
  const stream = require('stream')
```

#### 流的类型

* `Writable`：可以读取数据的流
* `Readable`：可以写入数据的流
* `Duplex`：可读可写流
* `Transform`：在读写过程中可以修改或者转换数据的`Duplex`

#### 可写流

可写流是对数据要被写入的目的地的一种抽象。可写流的例子包括：

- 客户端的 HTTP 请求
- 服务器的 HTTP 响应
- fs 的写入流
- zlib 流
- crypto 流
- TCP socket
- 子进程 stdin
- `process.stdout`、`process.stderr`

##### 事件

**`close`事件**

当流或者是起底层资源被关闭时触发。表明不会再触发其他事件，也不会再发生操作。

**`drain`事件**

当调用`stream.write(chunk)`返回`false`，当可以继续写入数据到流时会触发`drain`事件。

**`error`事件**

当写入数据出错时触发，此时流还未被关闭。

**`finish`事件**

调用`stream.end()`且缓冲出具都已经传给底层系统之后触发。

**`pipe`事件**

* src 可读流，通过管道流入的来源流

当在可读流上调用`stream.pipe()`时触发。

**`unpipe`事件**

- src 可读流

当在可读流上调用`stream.unpipe()`时触发，并且当可读流通过管道流向可写流发生错误时，也会触发`unpipe`事件。

#### 方法和属性

**`writable.cork()`**

强制把所有写入的数据都缓存到内存中。当调用`stream.uncork`或`stream.end()`时，缓冲的数据才会被输出。

**`writable.destroy([error])`**

销毁流，并触发`'error'`事件并传入`error`参数。调用该方法后可写流就结束了。

**`writable.end([chunk[,encoding[,callback]]])`**

* `chunk`：要写入的数据

* `encoding`：如果`chunk`是字符串，则指定字符编码
* `callback`：当流结束时的回调函数

调用`writable.end()`表明已经没有数据要写入到流中。

**`writable.setDefaultEncoding(encoding)`**

设置默认的字符编码

**`writable.uncork()`**

将调用`stream.cork()` 后缓冲的数据输出到目标中。当多次调用`stream.cork()`时需要调用相同次数的`stream.uncork()`才能将数据完整输出。

```js
//  example

const fs = require('fs')

const writable = fs.createWriteStream('./code.txt')

writable.cork()

writable.write('123')

writable.write('456')

console.log(writable.writableBuffer)

console.log(writable.writableLength)

writable.uncork()  // 不调用该方法，写入的数据会保存在内存中，调用之后输出到 './code.txt'中
```

**`writable.writableHighWaterMark`**

获取`writable`的`writableHighWaterMark`

**`writable.writableLength`**

返回队列中准备被写入的字节数或者是对象数

**`writable.write[chunk[,encoding[,callback]]])`**

- `chunk`：要写入的数据

- `encoding`：如果`chunk`是字符串，则指定字符编码
- `callback`：当数据块被输出到目标后的回调函数
- 返回： 返回一个`boolean`值，当流需要等待`drain`事件触发后才能继续写入的话，返回`false`，否则返`true`

`writable.write()` 写入数据到流，并在数据被完全处理之后调用 `callback`。 如果发生错误，则 `callback` 可能被调用也可能不被调用。 为了可靠地检测错误，可以为 `'error'` 事件添加监听器。

在接收了 `chunk` 后，如果内部的缓冲小于创建流时配置的 `highWaterMark`，则返回 `true` 。 如果返回 `false` ，则应该停止向流写入数据，直到 [`'drain'`](http://nodejs.cn/s/gFdjtJ) 事件被触发。



#### 可读流

可读流是对提供数据的来源的一种抽象。

可读流的例子包括：

- 客户端的 HTTP 响应
- 服务器的 HTTP 请求
- fs 的读取流
- zlib 流
- crypto 流
- TCP socket
- 子进程 stdout 与 stderr
- `process.stdin`

##### 两种读取模式

可读流运作与两种模式之一：流动模式和暂停模式

所有的可读流都开始于暂停模式，可以通过以下方式切换到流动模式

* 添加`data`事件监听
* 调用`stream.pipe()`
* 调用`stream.pause()`

切换暂停模式

* 如果没有管道目标，则调用`stream.pause()`
* 如果有管道目标，则移除所以的管道目标

##### 三种状态

在任意时刻，可读流会处于以下三种状态之一：

- `readable.readableFlowing === null`
- `readable.readableFlowing === false`
- `readable.readableFlowing === true`

##### 事件、方法、属性

事件`end`、`error`、`close`，方法`destory`、`readableHighWaterMark`，`readableLength`同 可写流。

**`data`事件**

* chunk：数据块

当流将数据块传送给消费者后触发

**`readable`事件**

当流中有数据可供读取时触发，当到达流数据的尽头时，`'readable'` 事件也会触发，但是在 `'end'` 事件之前触发

**`readable.pipe(des[,options])`**

* des：数据写入目标，必须是一个可写流
* options：
  * end: 默认为true，在reader结束时结束writer

`readable.pipe()` 方法返回 *目标流* 的引用，可以进行链式操作。

**`readable.read(size)`**

`readable.read()`方法从内部缓冲区中抽出并返回一些数据。

**`readable.resume()`**

`readable.resume()` 方法会重新触发 [`'data'`](http://nodejs.cn/s/8CCPjN) 事件, 将暂停模式切换到流动模式。

**`readable.unpipe([destination])`**

`readable.unpipe()` 方法将之前通过[`stream.pipe()`](http://nodejs.cn/s/Ea2ZNW)方法绑定的流分离

```js
const fs = require('fs')
const http = require('http')
const writer = fs.createWriteStream('./code.txt')

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

// request  是一个可写流
const request = http.request(options, res => {
  // res  是一个可读流，通过管道流流入writer中
  res.pipe(writer)
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

```

参考：

[中文文档](http://nodejs.cn/api/stream.html)

[官方文档](https://nodejs.org/api/stream.html)
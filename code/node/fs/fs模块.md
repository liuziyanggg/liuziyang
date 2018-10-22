#### fs 模块

`fs` 模块提供了API与文件系统进行交互，使用方法：

```js
const fs = require('fs')
```

所有的文件操作都有异步和同步两种形式，异步方式的最后都是完成时的回调。传给回调函数的参数取决于具体的方法。但回调函数的第一个参数都会保留给异常。如果操作成功完成，第一个参数会为`null`或`undefined`

当使用同步操作的时候，出现异常会立即抛出。

##### 文件路径

大部分的`fs`的操作接受字符串、Buffer、或使用`file:`协议的URL对象作为文件路径。字符串形式的路径会被解释为表示绝对路径或相对路径的 UTF-8 字符序列。 相对路径会相对于 `process.cwd()` 定义的当前工作目录进行处理

##### fs.FSWatcher 类

使用`fs.watch()` 方法会返回一个新的`fs.FSWatcher`对象。所有的`fs.FSWatcher`对象都部署了`EvventEmitter`，每当监视的文件变化时会触发`change`事件。

##### change 事件

当监视的目录或文件有变化时触发，回调参数

* eventType: 事件类型
* filename: 变化的文件名

##### close事件

当`watcher`停止监视文件变化时触发。关闭的`fs.FSWatcher`对象在事件处理函数中不再可用

##### error事件

当监视文件发生错误时触发。关闭的`fs.FSWatcher`对象在事件处理函数中不再可用

##### watcher.close()

`fs.FSWatcher`停止监视文件变化。一旦停止之后，`fs.FSWatcher`对象将不再可用



##### 文件和文件夹读取操作

##### fs.readdir(path[,option], callback) 和 fs.readdirSync(path[,option])

读取一个目录的内容。

path：是文件路径

options：可以是一个字符串指定字符编码或者是一个对象并且使用`encoding`指定字符编码。如果`encoding`设为`'buffer'`,则返回的文件名会被作为`Buffer`对象传入。`encoding`的默认值是utf8

callback：异步方法的回调，参数是`(err, files)`

同步方法返回一个不包含`'.'`和`'..'`的文件名或文件夹数组

##### fs.readFile(path[,option], callback) 和 fs.readFileSync(path[,option])

读取一个文件的所有的内容

path：文件路径

options：<string> || <Object>

​	encoding: 编码方式，默认为null

​	flag: 文件系统flag，默认为'r'

callback: 读取完成的回调函数，参数`(err, data)`

```js
const fs = require('fs')
fs.readFile('./1.txt', 'utf8', (err, data) => {
    if (err) throw Error(err)
    console.log(data)
})
```



##### fs.writeFile(file,data[,options], callback) 和 fs.writeFileSync(file,data[,options])

file：文件名或者是文件描述符

data：要写入的数据

options：

​	encoding：编码方式，默认是'utf8'

​	mode: 写入模式，默认为0o666

​	flag: 文件系统flag，默认为'w'

callback: 异步文件写入完成回调，参数 err

写入数据到文件中，如果文件已经存在则覆盖文件。`data`可以是字符串或者是buffer。如果data是一个buffer，则`encoding`无效



##### fs.read(fd, buffer, offset, length, position, callback) 和 fs.readSync(fd, buffer, offset, length, position)

从指定的文件`fd`中读取数据

`buffer` 是读取到的数据将要被写入的buffer

`offset`是buffer中开始写入的偏移量

`length`是一个整数表示读取的数据的长度

`position`指定从文件中开始读取的位置。如果为`null`，则从当前文件读取的位置开始读取，并且文件的位置会更新。如果 `position` 为一个整数，则文件读取位置保持不变。

`callback`文件读取结束的回调函数，有三个参数`(err, bytesRead, buffer)`



#### 获取文件状态

**`fs.stat(path[,options], callback)` 和` fs.statSync(path[,options])`**

path: 文件路径

options: 

​	bigint <boolean> 在返回的`fs.Stats`对象中的数字类型值是否为`bigint`。默认值是：`false`

用来获取文件状态相关的信息。返回的是一个`fs.Stats`对象，该对象包含一些文件信息并提供一些方法。
常用的方法：

```js
stats.isDirectory()   //  判断是都是一个文件目录
stats.isFile()  // 判断是否是一个文件
```

#### 获取权限
**`fs.access(path[,mode],callback)` 和 `fs.accessSync(path[,mode])`**
* path <string> | <Buffer> | <URL>： 测试`path`的文件或者目录的用户权限。`mode`参数是一个可选的整数，指定要执行的可访问性检查。
* mode <Integer> 默认为 `fs.constants.F_OK`
* callback: 异步方法的回到，参数是`err`, 当可访问性检查失败是，err会是一个`Error`对象。

该方法可以用来检查文件是否存在、是否可读可写

```js
// 判断文件是否存在并且可读可写
 const fs = require('fs')
 fs.access('./1.txt', fs.constants.F_OK | Fs.constants.W_OK, err => {
     if (err) {
         console.log(err.code === 'ENOENT' ? '不存在' : '只可读')
     } else {
         console.log('可读可写')
     }
 })
```

#### 修改权限

**`fs.chmod(path, mode. callback)`和`fs.chmodSync(path, mode)`**

* `path` <string> | <Buffer> | <URL>  文件或目录路径
* `mode` <interger> ：权限值

* `callback`：异步方法的回调，参数为：err

同步方法的返回值是undefined

#### 文件复制

**`fs.copyFile(src, dest [,flags], callback)` 和`fs.copyFile(src, dest [,flags])`**

* src 要拷贝的源文件名称
* dest 拷贝操作的目标文件名
* flags 拷贝操作修饰符，默认是`0`
* callback: 异步方法的回调

该方法将`src`拷贝到`dest`,如果`dest`已经存在会被覆盖。

`flags`是一个可选的整数，指定拷贝操作的行为。唯一支持的`flags`是`fs.constants.COPYFILE_EXCL`,如果`dest`已经存在，则导致拷贝失败

```js
var fs = require('fs')

fs.copyFile('./1.txt', './3.txt' ,err => {
    console.log(err)
})

fs.copyFile('./1.txt', './3.txt', fs.constants.COPYFILE_EXCL ,err => {
    console.log(err)
})
```

####  创建文件目录

**`fs.mkdir(path[,options],callback)`和`fs.mkdirSync(path[,options])`**

```js
var fs = require('fs')
fs.mkdir('./test', err => {
    console.log(err)
})

// 在 v10.12.0中 options中使用{recursive: true}递归创建目录
```

#### 删除文件

**`fs.rmdir(path, callback)`和`fs.rmdirSync(path)`**

```js
var fs = require('fs')
fs.rmdir('./test', err => {
    if (err) {
        console.log(err)
    } else {
        console.log('删除完成')
    }
})
```



#### 参考：

[node中文文档](http://nodejs.cn/api/fs.html#fs_file_system)

[node官方文档](https://nodejs.org/api/fs.html)
### path 模块

`path` 模块提供了一些工具函数用于处理文件与目录的路径。使用方式：

``` js
const path = require('path')
```

`path`模块的默认操作会根据nodejs应用程序运行的操作系统的不同而变化。比如，运行在windows操作系统是会使用windows风格的路径。

可以通过`path.win32` 和 `path.posix` 实现在不同的操作系统获取相同风格的结果。

#### path.basename(path[,ext])

返回一个`path`最后一部分，ext可选的扩展名

```js
path.basename('/a/b/c/d.html', '.html')  // d
path.basebane('/a/b/c/d.html')  // d.html
path.basename('/a/b/c/d.html', '.txt')  //d.html
```



#### path.delimiter

返回特定平台的路径分隔符

* windows 上是`;`
* Posix 上是`:`

#### path.dirname(path)

返回一个`path`的目录名

```js
path.dirname('a/aa/aaa/a')  // a/aa/aaa
```

#### path.extname(path)

返回一个`path`的扩展名。取值规则是：

* 从`path`最后一个部分中的最后一个`.`字符到字符串结束;
* 如果`path`的最后一个部分没有`.`或者`path`的文件名的第一个字符是`.`，则返回一个空字符串

```js
path.extname('/a/aa/aaa/index.html')  // .html
path.extname('index.template.html')  // .html
path.extname('.index.html') // .html
path.extname('.index')  // ''
path.extname('index') // ''
```

如果传入的`path`不是字符串，则抛出异常

##### path.format(pathObj)

返回`path`对象拼接成的`path`字符串

`path` 对象有5个属性：dir, root, base, name, ext

当提供的属性有组合的时候，有些属性的优先级比其他属性高：

* 当提供了`dir`时，`root` 会被忽略
* 当提供了`base`时，`ext`和`name`会被忽略

```js
path.format({
    dir: '/home/user/dir',
    base: 'file.txt',
    root: '/ignore',
    ext: '.exe',
    name: 'test'
}) // /home.user.dir/file.txt
```

#### path.isAbsolute(path)

判断一个`path` 是否是绝对路径

如果传入的`path`是一个长度为零的字符串返回`false`

``` js
path.isAbsolute('/a/b/c')  // true
path.isAbsolute('./a/b/c') // false
path.isAbsolute('a/b/c')  // false
path.isAbsolute('.')  // false
path.isAbsolute('')  // false
```

#### path.join([...paths])

该方法使用特定平台的分隔符把全部给定的`path`片段连接到一起，并生成规范化的路径。

长度为`0`的片段会被忽略。如果连接后的路径字符串是一个长度为`0`的字符串，则返回`'.'`，表示当前工作目录

```js
path.join('a', 'b', 'c', 'd', 'e.html')  // Windows  a\\b\\c\\d\\e.html
									 // Posix   a/b/c/d/e.html
```

#### path.normalize(path)

返回一个规范化后的`path`字符串，并解析`'..'`和`'.'`

当出现多个连续的分隔符是，会被单个路径分割符替换。末尾的多个分割符会被保留。

```js
path.normalize('/a////b////c//d') // Windows  a\\b\\c\\d
								// Posix   a/b/c/d
```

#### path.parse(path)

返回一个对象，其属性表示`path`元素。尾部文件分隔符会被忽略。

```js
// Posix
path.parse('/a/b/c/d/e.html')  
/**{
    root: '/',
    dir: '/a/b/c/d',
    base: 'e.html',
    ext: '.html',
    name: 'e'
}**/
// Windows

path.parse('C:\\path\\dir\\file.txt');

/** 返回:
{
  root: 'C:\\',
  dir: 'C:\\path\\dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
} **/
```

#### path.relative(from, to)

返回从`from` 到`to`的相对路径，如果`from` 和`to`各自解析到同一路径，则返回一个长度为`0`的字符串

如果`from` 或`to`传入了长度为`0`的字符串，则当前工作目录会被用于替换长度为`0`的字符串

```js
path.relative('/a/b/c', '/a/b/d')  // ../d
```

#### path.resolve([...paths])

将传入的路径片段序列解析为一个绝对路径。解析规则：

* 给定的路径的序列是从右向左处理的，当构造完成一个绝对路径之后会停止处理。
* 如果全部路径序列处理完成之后，任然不是一个绝对路径，则会将当前工作目录用上
* 生成的路径是规范化后的，并且末尾的斜杠会被删除，除非路径被解析为根目录
* 长度为`0`的`path`片段会被忽略
* 如果没有传入`path`片段，返回当前目录

```js
path.resolve('/foo/bar', './baz')  // /foo/bar/baz
path.resolve('/foo/bar', '../baz') // /foo/baz
path.resolve('/foo', '/bar', 'baz')  //  /bar/baz
path.resolve('foo', 'bar', 'baz')  // 当前工作目录/foo/bar/baz
path.resolve()  // 当前工作目录
```

#### path.sep

返回平台特定的路径分隔符

* Windows上是`\`
* Posix上是`/`

注意：在 Windows 上，斜杠字符（`/`）和反斜杠字符（`\`）都可作为路径分隔符； 但 `path` 的方法只添加反斜杠（`\`）。

### 参考

[http://nodejs.cn/api/path.html#path_path_basename_path_ext](http://nodejs.cn/api/path.html#path_path_basename_path_ext)
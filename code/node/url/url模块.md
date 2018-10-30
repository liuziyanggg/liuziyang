### url 模块

`url`模块用来处于URL的解析和处理，使用方式如下：

```js
const url = require('url')
```

URL 字符串是具有结构的字符串，包含多个意义不同的组成部分。 URL 字符串可以被解析为一个 URL 对象，其属性对应于字符串的各组成部分。

`url`模块提供了两套API来处理URL字符串，一套是nodejs特有的API，一套是实现了`WHATWG URL Standard`的API。

下图中，网址 `'http://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'` 上方是由遗留的`url.parse()`返回的对象的属性。网址下方的则是WHATWG `URL`对象的属性。

WHATWG URL的`origin`属性包括`protocol`和`host`，但不包含`username`、`password`。

```txt
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
│   origin    │                     │       origin        │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

使用nodejs提供的API解析一个URL字符串

```js
const url = require('url')
const myurl = url.parse('http://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash')

```

使用WHATWG API解析一个URL字符串：

```js
const { URL } = require('url')
const myurl = new URL('http://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash')
```

#### URL 类

`URL`类实例化返回一个`URL`对象，`URL` 对象的所有属性都是在类的原型上实现为getter和setter。

##### `new URL(input[,base])`

* input：要解析的`url`字符串
* base：如果`input`是相对URL，则`base`为要解析的基本`URL`。

当`input`使用相对URL时不提供`base`会抛出`invalid URL`异常。

#### URLSearchParams 类

##### `new URLSearchParams([url])`

* url `<string> | <object>` | <Iterable>：实例化一个`URLSearchParams`对象

```js
const { URLSearchParams } = require('url')
const search = new URLSearchParams('query=string#hash')
```

##### `urlSearchParams.append(name, value)`

在查询字符串中加入一个键值对

##### `urlSearchParams.delete(name)`

删除所有键名为`name`的键值对

##### `urlSearchParams.get(name)`

返回键是`name`的第一个键值对的值。如果没有对应的键值对则返回`null`

##### `urlSearchParams.getAll(name)`

返回所有键是`name`的键值对的值

##### `urlSearchParams.has(name)`

判读是否存在键是`name`的键值对。

##### `urlSearchParams.set(name, value)`

将`URLSearchParams`对象中与`name`相对应的值设置为`value`。如果已经存在键为`name`的键值对，将第一对的值设为`value`并且删除其他对。如果不存在，则将此键值对附加在查询字符串后。

##### `urlSearchParams.sort()`

按现有名称就地排列所有的名称-值对

##### `urlSearchParams.toString()`

返回序列化后的字符串

#### `url.format(URL[,options])`

格式化一个URL对象或者是字符串，如果传入的是字符串会调用`url.parse()`转换成URL对象。

##### `url.parse(urlString[,parseQueryString[,slasherDenoteHost]])`

`url.parse()` 方法会解析一个 URL 字符串并返回一个 URL 对象

##### `url.resolve(from, to)`

- `from` 解析时相对的基本 URL。
- `to` 要解析的超链接 URL。

`url.resolve()` 方法会以一种 Web 浏览器解析超链接的方式把一个目标 URL 解析成相对于一个基础 URL。

```js
const { URLSearchParams } = require('url')
const search = new URLSearchParams()

search.append('a', 'a')  // {a => a}
search.append('b', 'b')  // {a => a, b => b}
search.append('c', 'c')  // {a => a, b => b, c => c}

search.has('a')  // true
search.has('d')  // false

search.delete('c')  // {a => a, b => b}

search.append('a', 'a1')
search.getAll('a')  //  ['a', 'a1']

search.set('a', 'a2') //  {a => a2, b => b}



```


#### 模拟实现`bind`方法

先来分析一下，我们自定义`bind`方法需要实现哪些功能

1. 返回一个新的绑定函数
2. 调用返回的绑定函数的时候可以传入参数修改`this`的指向
3. 返回的绑定函数可以使用`new`操作符调用，此时需要忽略传入的this参数

1、第一个版本，返回一个绑定函数并且能够修改`this`的指向

```js
Function.prototype._bind = function (context) {
    var args = Array.prototype.slice.call(arguments, 1)
    var self = this
    return function () {
        args = args.concat(Arary.prototype.slice.call(arguments))
        self.apply(context, args)
    }
}
```

```js
// 测试
function foo () {
    console.log(this.a)
}
var a = 'global'
var obj = {
    a: 'local'
}
var bar = foo._bind(obj)
bar() // 'local'
```

2、第二个版本，处理通过`new`调用返回的绑定函数

```js
Function.prototype._bind = function (context) {
    if (typeof this !== 'function') {
        throw Error('Function.prototype._bind - what is trying to be bound is not callable')
    }
    var args = Array.prototype.slice.call(arguments, 1)
    var self = this
    function Tmp () {}
    function Fbind () {
        args = args.concat(Array.prototype.slice.call(arguments))
        self.apply(this instanceof Tmp ? this : context, args)
    }
    Tmp.prototype = this.prototype
    Fbind.prototype = new Tmp()
    return Fbind
}
```

[MDN bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

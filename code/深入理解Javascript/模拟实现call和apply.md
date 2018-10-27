###  模拟实现`call()`和`apply()`

`call()`和`apply()`都能够用来绑定`this`到某个对象上，我们来模拟实现一下相同的功能。

先看个例子

```js
function () {
  console.log(this.a)
}
var a = 'global'

var obj = {
  a: 'local',
  foo: foo
}

obj.foo()  //  local

```

可以看到，通过对象的某个属性来调用函数时，该函数内部的`this`会指向当前对象。这样我们就有思路模拟`call`和`apply`。也就是说将调用`call`或者`apply`的函数保存在`this`要绑定到的对象，然后通过该对象来调用函数就可以了。

####  模拟`call`的实现

```js
Function.prototype._call = function (context) {
    context.fn = this
    var result = context.fn()
    delete context.fn
    return result
}
```

做个测试

```js
function foo() {
    console.log(this.a)
}
var a = 'global'
var obj = {
    a: 'local'
}
foo._call(obj)  // 'local'
```

很简单，我们已经实现了简单的`call`的模拟，还有参数传递没有实现。

`call`和`apply`接收的参数都是不固定的，从索引值第一个开始需要传递给调用的函数。可以使用`eval()`来执行这个函数，就可以实现。

```js
Function.prototype._call = function (context) {
    context.fn = this
    var args = []
    var len = arguments.length
    for (var i = 1; i < len; i++) {
        args.push('arguments[' + i + ']')
    }
    var result = eval('context.fn(' + args + ')')
    delete context.fn
    return result
}
```

继续做个测试

```js
function foo (name, age) {
    console.log(name)
    console.log(age)
}
var obj = {}

foo._call(obj, 'name', 'age')   // 'name'  'age'
```

我们还记得，`call`可以传入`null`和`undefined`，这是`this`会指向全局对象，再修改下我们的实现

```js
Functuin.prototype._call = function (context) {
    if (typeof this !== 'function') {
        throw Error('Function.prototype._bind - what is trying to be bound is not callable')
    }
    context = context || window   //  这里只考虑了浏览器中的实现
    context.fn = this
    var args = []
    var len = arguments.length
    for (var i = 1; i < len; i++) {
        args.push('arguments[' + i + ']')
    }
    var result = eval('context.fn(' + args + ')')
    delete context.fn
    return result
}
```

#### 模拟`apply`的实现

`apply`的模拟和`call`很类似，只是参数处理的时候有些不同。

```js
Function.prototype._apply = function (context, args) {
    if (typeof this !== 'function') {
        throw Error('Function.prototype._bind - what is trying to be bound is not callable')
    }
    context = context || window   //  这里只考虑了浏览器中的实现
    context.fn = this
    var result = undefined
    if (!args) {
        result = context.fn()
    } else {
        var len = args.length
        var tmp = []
        for (var i = 0; i < len; i++) {
            tmp.push('args[' + i + ']')
        }
        result = eval('context.fn(' + tmp + ')')
    }
    delete context.fn
    return result
}
```

简单的测试一下

```js
var a = 'global'
function foo (name, age) {
    console.log(this.a)
    console.log(name, age)
}
var obj = {
    a: 'local'
}

foo._apply(obj, ['name', 'age'])
//  local
//  'name' 'age'
```




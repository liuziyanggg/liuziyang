### this

this是执行上下文中的一个重要属性

* 变量对象(Variable Object, VO)
* 作用域链(Scope chain)
* this

#### 全局执行上下文中的this

在全局执行上下文中，`this`指向全局对象。

```js
// 在浏览器中
console.log(this === window)   // true
```

#### 函数上下文中的this

在函数内部，`this`的值取决于函数被调用的方式，同一个函数调用的方式不同`this`的值就可能不同

```js
function foo () {
    console.log(this.a)
}
var a = 'global'
var obj = {
    a: 'local',
    foo: foo
}
obj.foo()  // local
foo()  // global
```



##### 独立函数调用

此时，在非严格模式下，`this`指向全局对象，在严格模式下`this`是`undefined`

```js
function foo () {
    return this
}
console.log(foo() === window)   // true

function bar () {
    'use strict'
    return this
}
console.log(bar())  // undefined
```

##### 作为对象方法

当函数作为对象方法调用时，`this`指向调用该方法的对象。

```js
var obj = {
    a: 'aaa',
    foo: function () {
        console.log(this.a)
    }
}
obj.foo()   // 'aaa'
var foo = obj.foo
foo() // undefined
```

当将一个函数的方法赋值给另外一个变量，然后通过变量去调用该方法时，此时属于作为独立函数调用，`this`的值会指向全局对象。

##### 作为构造函数

当一个函数做为构造函数使用时，`this`执行构造函数返回的新对象。

```js
var a = 'global'
function Foo () {
    this.a = 'local'
}
var foo = new Foo()
foo.a  // 'local'
```

##### 修改`this`的指向

###### 使用`call` 和`apply`

可以使用`call`和`apply`来显示的修改`this`的指向

```js
var a = 'global'
function foo () {
    console.log(this.a)
}
var obj = {
    a: 'obj'
}

var obj2 = {
    a: 'obj2'
}
foo.call(obj)  //  'obj'
foo.call(obj2)  //  'obj2'

```

如果给`call`或`apply`传入一个`null`或者`undefined`

在非严格模式下`this`指向全局对象，在严格模式下`this`为传入的值。

```js
var a = 'global'
function foo () {
    console.log(this.a)
}
function bar () {
    'use strict'
    console.log(this)
}

foo.call(null)  //  'global'

bar.call(null)  //  null
```

**`apply()`和`call()`的区别**

`apply()`和`call()`的作用相同都是用来显示的修改`this`的指向，在传递参数上有些区别：

```js
//  apply
function foo (...args) {
    console.log(args)
    console.log(arguments)
}

foo.apply(null, [1, 2, 3])

foo.apply(null, 1, 2, 3)  // TypeError
```

```js
//  call
function foo (...args) {
    console.log(args)
    console.log(arguments)
}
foo.call(null, [1, 2, 3])

foo.call(null, 1, 2, 3) 
```

上面两个例子可以看出：

* `apply()` 在传递参数的时候必须使用数组或者类数组对象，`apply()`会将参数数组的每一个元素传入调用的函数中
* `call()`则是传入一组参数列表

###### 使用`bind`

>  `bind(thisArg[arg1[,...]])`

* thisArg：传递给绑定函数的this参数，当使用`new`时该值被忽略
* arg1,...：调用绑定函数时，这些参数会在实参之前传递给被绑定的函数

`bind()` 会返回一个新的函数，该函数中的`this`指向传入的值。

```js
var a = 'global'
function foo () {
    console.log(this.a)
}
var obj = {
    a: 'local'
}
var tmpFoo = foo.bind(obj)
tmpFoo() // local
```

当使用 `new` 调用`bind`返回的函数时，`this`参数提供的值将会被忽略，此时`this`指向

```js
var a = 'global'
function foo () {
    this.a = '123'
}
var obj = {
    a: 'local'
}
var tmpFoo = foo.bind(obj)
var bar = new tmpFoo(obj)
bar.a  // '123'
```



```js
function foo (name, age) {
    console.log('name:', name)
    console.log('age:', age)
}
var bar = foo.bind(null, 'name')
bar('age')
// 'name: name'
// 'age: age'

```

##### 箭头函数中的`this`

ES6中引入了箭头函数，箭头函数不会创建自己的`this`，只会从自己的作用域链的上一层继承`this`。

```js
var a = 'global'
function foo () {
    var self = this
    setTimeout(function () {
        console.log(this.a)
        console.log(self.a)
    }, 0)
}
var obj = {
    a: 'local'
}
foo()  //  'global'  'global'
foo.call(obj) // 'global' 'local'

```

````js
var a = 'global'
function foo () {
    var self = this
    setTimeout(() => {
        console.log(this.a)
        console.log(self.a)
    }, 0)
}
var obj = {
    a: 'local'
}
foo()  //  'global'  'global'
foo.call(obj) // 'local' 'local'
````



#### 扩展：自定义`bind`方法

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


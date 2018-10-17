###  node.js  events模块

nodejs 大多数的核心API依赖异步的事件驱动，events 模块提供了触发器和监听器，通过触发命名事件来调用监听器。

这些能够触发事件的API都是EventEmitter类的实例。

#### EventEmitter 类

EventEmitter 类提供的方法有很多，但是常用的只有几个。

##### 方法

* on(eventName, listener) :  添加 `listener`函数到名为`eventName`的事件监听器数组的末尾，不会检查`listener`是否已被添加，传入同名的`eventName`和`listener` 会导致`listener`添加多次。

  返回值是当前事件实例

```js
const EventEmitter = require('events')
const emitter = new EventEmitter()
emitter.on('event', () => {
    console.log('event')
})

emitter.emit('event')
```



* emit(eventName [,args])： 按照监听器注册的顺序，同步的调用每个注册到名为`eventName`的事件的监听器，并传入提供的参数，如果事件有监听器返回`true`，否则返回`false`

* addListener: on(eventName, listener)  的别名

* removeListener(eventName, listener): 从名为`eventName`的监听器数组中移除指定的`listener`，返回值是当前事件实例

  **注意：**

  1. 该方法每次最多移除一个`listener`；
  2. 一旦事件被触发，所有绑定在该事件的监听器会被依次调用。也就是说在事件触发之后、并且最后一个监听器完成之前，`removeListener` 和 `removeAllListener`不会从监听器数中移除`listener`

  ```js
  const EventEmitter = require('events')
  const emitter = new EventEmitter()
  const callbackA = () => {
      console.log('A')
      emitter.removeListener('event', callbackB)
  }
  const callbackB = () => {
      console.log('B')
  }
  emitter.on('event', callbackA)
  emitter.on('event', callbackB)
  emitter.emit('event')
  ```

* off(eventName, listener): removeListener(eventName, Listener)的别名

* removeAllListener(eventName): 移除全部监听器或指定的 `eventName` 事件的监听器。返回值是当前事件实例。

* once(eventName, listener): 添加单次监听器 `listener` 到名为 `eventName` 的事件。 当 `eventName` 事件下次触发时，监听器会先被移除，然后再调用。

* eventNames()：返回已注册监听器的事件名数组。

  ``` js
  const EventEmitter = require('events')
  const emitter = new EventEmitter()
  emitter.on('event', () => {})
  emitter.on('foo', () => {})
  console.log(emitter.eventNames())
  // ['event', 'foo']
  ```


##### 常用事件

* removeListener ： `'removeListener'` 事件在 `listener` 被移除后触发
* newListener：`newListener`事件在添加新的监听器时触发。在`newListener` 回调中注册的同名事件的监听器会被注册在改事件的监听器数组的前面。



#### 拓展

events模块是nodej中的核心模块，如果想在浏览器中使用就需要自己手动去实现。

#### 参考

[nodejs文档](https://nodejs.org/dist/latest-v10.x/docs/api/events.html)
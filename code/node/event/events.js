class EventEmitter {
  constructor () {
    this.cache = {}
    this.defaultMaxListerers = 10
  }

  addListener (eventName, listener) {
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(listener)
    return this
  }

  on (eventName, listener) {
    return this.addListener(eventName, listener)
  }

  once (eventName, listener) {
    const fn = (...args) => {
      this.removeListener(eventName, fn)
      listener.apply(this, args)
    }
    fn.eventjsListener = listener
    this.addListener(eventName, fn)
  }

  emit (eventName, ...args) {
    let listeners
    if (!(listeners = this.cache[eventName])) {
      return false
    }
    listeners = listeners.slice()
    const len = listeners.length
    let flag = false
    for (let i = 0; i < len; i++) {
      const listener = listeners[i]
      listener.apply(this, args)
      flag = true
    }
    return flag
  }

  removeListener (eventName, listener) {
    if (!listener) {
      throw Error('property listener expect a function but get undefined')
    }
    let listeners
    if (!(listeners = this.cache[eventName])) {
      return this
    }

    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener || listeners[i].eventjsListener === listener) {
        listeners.splice(i, 1)
        break;
      }
    }
    if (listeners.length === 0) {
      delete this.cache[eventName]
    }
    return this
  }

  off (eventName, listener) {
    return this.removeListener(eventName, listener)
  }

  getMaxListerers () {
    return this.defaultMaxListerers
  }

  setMaxListeners (n) {
    this.defaultMaxListerers = n
    return this
  }
  removeAllListener (eventName) {
    if (!eventName) {
      this.cache = {}
      return this
    }
    delete this.cache[eventName]
  }
}

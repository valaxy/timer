Timer is tiny async utility, seek for a more powerful async tool, see [async](https://github.com/caolan/async)

# Introduction
Timer is a async class that control a task to execute repeatedly.
File `src/timer.js` is AMD package

# Example

```javascript
var Timer = require('./src/timer')

// instantiate a Timer
var timer = new Timer({
    interval: 1000, // default is 1000ms
    task: function (next) {
        console.log('task execute')
        next() // you must call next() to run next this task
    }
})

// start the timer and it will run task over and over again at the interval
timer.start()

// stop the timer
timer.stop()

// immediate execute task
timer.immediate()
```

# Remember
- start a started-timer will do nothing
- stop a stopped-timer will do nothing
- after stopping nothing will trigger until next start
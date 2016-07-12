[![Dependency Status](https://david-dm.org/valaxy/timer.svg?style=flat-square)](https://david-dm.org/valaxy/timer)
[![devDependency Status](https://david-dm.org/valaxy/timer/dev-status.svg?style=flat-square)](https://david-dm.org/valaxy/timer#info=devDependencies)
Timer is tiny async utility, to seek for more powerful async tool, see [async](https://github.com/caolan/async)

# Introduction
Timer controls a task to execute repeatedly.    
Module `src/timer` is CommonJS package        
AMD user check [valaxy/cjs](https://github.com/valaxy/cjs)

# Example

```javascript
var Timer = require('timer')

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
// if timer has not stated, start will be triggered first
timer.immediate()
```

# Remember
- start a started-timer will do nothing
- stop a stopped-timer will do nothing
- after stopping nothing will trigger until next start
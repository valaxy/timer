[![Dependency Status](https://david-dm.org/valaxy/timer.svg?style=flat-square)](https://david-dm.org/valaxy/timer)
[![devDependency Status](https://david-dm.org/valaxy/timer/dev-status.svg?style=flat-square)](https://david-dm.org/valaxy/timer#info=devDependencies)

Timer is tiny **async utility**, to seek for a more powerful **async** tool, see [async](https://github.com/caolan/async)

# Introduction
Timer controls a task to execute repeatedly.      
Module `src/timer` is CommonJS package         

# Example

```typescript
import Timer = require('timer')

// instantiate a Timer
let timer = new Timer({
    interval: 1000, // how long between two runnings of tasks, default is 1000ms
    task: function (next) {
        console.log('task execute')
        next() // you must call next() to trigger next task running
    }
})

// start the timer, the first task will execute after `interval`
// start a started-timer will do nothing
timer.start()

// stop the timer
// stop a stopped-timer will do nothing
timer.stop()

// immediate execute task no matter how long until next task
// if timer has not started, start first and then execute task immediately
timer.immediate()
```
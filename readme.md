timer is tiny async utility, to seek a more powerful async tool, see [async](https://github.com/caolan/async)

# Introduction
Timer is a async class that control a task to execute repeatedly.
File `src/timer.js` is AMD or CMD package

# Example

```javascript
var Timer = require('./src/timer')

// instantiate a Timer
var timer = new Timer({
    interval: 1000, // default is 1000ms
    task: function () {
        console.log('task execute')
        this.next() // you must call next() to run next this task
    }
})

// start the timer and it will run task over and over again at the interval
timer.start()

// stop the timer
timer.stop()

// immediate execute task
timer.immediate()
```

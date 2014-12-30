Timer is a class that control a task to execute repeatedly. 
File timer.js is under CMD package, to see what is [CMD](https://github.com/seajs/seajs)

# Example

```javascript
var Timer = require('./src/timer')

// instantiate a Timer
var timer = new Timer({
    task: function () {
        console.log('task execute')
        this.next() // you must call next() to run next this task
    }
})

// start the timer and it will run task over and over again at a 1000ms interval(default)
timer.start()

// stop the timer
timer.stop()
```

# Introduction
API detail see [Timer](http://valaxy.github.io/timer/doc/Timer.html)

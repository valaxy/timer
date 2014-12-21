timer.js is a utility to use setTimeout easily.

# Example

    // instantiate a Timer, pass a task to really do something
    var timer = new Timer({
        task: function () {
            console.log('task execute')
            this.next()
        }
    })

    // start the timer and it will run task over and over again at a 1000ms interval
    timer.start()

    // stop the timer
    timer.stop()

# Introduction
Timer is under CMD package, make you use setTimeout easily.  
API detail to see [Timer](valaxy.github.io/timer.js/doc/Timer.html)

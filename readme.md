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
- Timer


    var timer = new Timer({
        task: function() { ... },
        immediate: false,
        interval: 1000
    })

- start()
- stop()
- resume()
- next()

import Task = require('./task')


class Timer {
    private _fn
    private _interval
    private _task:Task

    /**
     * Control executing task repeatedly under a interval time.
     * @constructor Timer
     * @param options
     *  - interval:   a number, the interval time between tasks, default is 1000 <br/>
     *  - task(next): a function about the task, call `next()` to end current task and begin to run next task
     *      - next: a function, when your task is over, call this method to run next task at next time point
     */
    constructor(options) {
        options = options || {}
        if (typeof options.task == 'undefined') throw new Error("Not set option.task, pass a function to option.task")
        this._fn = options.task // must be exist
        this._interval = (typeof options.interval != 'undefined') ? options.interval : 1000
        this._task     = null
    }

    /**
     * Start the timer or restart after stopping.
     * @param options
     *   immediate: a bool, whether execute the task at once, default is false
     * @function start
     * @memberof Timer
     * @instance
     */
    start(options?) {
        if (this._task !== null) return
        this._task = new Task({
            fn      : this._fn,
            interval: this._interval
        })

        options           = options || {}
        options.immediate = typeof options.immediate == 'undefined' ? false : options.immediate
        this._task.exec(options)
    }


    /**
     * Stop the timer after starting.
     * @function stop
     * @memberof Timer
     * @instance
     */
    stop() {
        if (this._task === null) return
        this._task.stop()
        this._task = null
    }


    /**
     * Execute the task immediately, and after executing reset timer
     * @function immediate
     * @memberof Timer
     * @instance
     */
    immediate() {
        this.stop()
        this._fn(() => {
            this.start()
        })
    }
}



export = Timer

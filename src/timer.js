define(function () {

	/**
	 * Control executing task repeatedly under a interval time.
	 * @constructor Timer
	 * @param options
	 *  - interval: a number, the interval time between tasks, default is 1000 <br/>
	 *  - task: a function about the task, call `this.next()` to end current task and begin to run next task
	 */
	var Timer = function (options) {
		if (!options) {
			options = {}
		}
		if (typeof options.task == 'undefined') {
			throw "Not set option.task, pass a function to option.task"
		}
		this._options = {
			task: options.task, // must be exist
			interval: (typeof options.interval != 'undefined') ? options.interval : 1000
		}
		this._handler = null   // setTimeout handler
	}


	/**
	 * Start the timer or restart after stopping.
	 * @param immediate a bool, whether execute the task at once, default is false
	 * @function start
	 * @memberof Timer
	 * @instance
	 */
	Timer.prototype.start = function (immediate) {
		if (immediate) {
			this._options.task.apply(this)
		} else {
			this.next()
		}
	}


	/**
	 * Stop the timer after starting.
	 * @function stop
	 * @memberof Timer
	 * @instance
	 */
	Timer.prototype.stop = function () {
		clearTimeout(this._handler)
	}


	/**
	 * When your task is over, call this method to run next task at next time point
	 * @function next
	 * @memberof Timer
	 * @instance
	 */
	Timer.prototype.next = function () {
		this._handler = setTimeout(this._options.task.bind(this), this._options.interval)
	}


	/**
	 * execute the task immediately, and after executing reset timer
	 * @function immediate
	 * @memberof Timer
	 * @instance
	 */
	Timer.prototype.immediate = function () {
		this.stop()
		this._options.task.apply(this)
	}


	return Timer
})

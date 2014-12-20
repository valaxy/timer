define(function () {

	/**
	 * Control executing task repeatedly under a interval time.
	 * @param options
	 *  - immediate: a bool, whether execute the task at once, default is false
	 *  - interval: a number, the interval time between tasks, default is 1000
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
			immediate: (typeof options.immediate != 'undefined') ? options.immediate : false,
			interval: (typeof options.interval != 'undefined') ? options.interval : 1000
		}
		this._handler = null        // setTimeout handler
		this._startTimePoint = -1   // start time point of last task
		this._waitTime = null      // wait time of next task
	}


	/**
	 * Start the timer or restart after stopping
	 */
	Timer.prototype.start = function () {
		this._startTimePoint = new Date().getTime()
		this._waitTime = null
		if (this._options.immediate) {
			this._options.task()
		} else {
			this._handler = setTimeout(this._options.task.bind(this), this._options.interval)
		}
	}


	/**
	 * Stop the timer after starting
	 */
	Timer.prototype.stop = function () {
		this._waitTime = this._options.interval - (new Date().getTime() - this._startTimePoint)
		clearTimeout(this._handler)
	}


	/**
	 * Resume the timer After starting, the difference between start and resume is:
	 * if there is a task has a interval 1000ms bug stop at 400ms, resume will go-on-wait other 600ms to execute the task
	 * start has to wait the whole 1000ms to execute the next task
	 */
	Timer.prototype.resume = function () {
		this._startTimePoint = new Date().getTime()
		this._handler = setTimeout(this._options.task.bind(this), this._waitTime)
	}


	/**
	 * When your task is over, call this method to run next task at next time point
	 */
	Timer.prototype.next = function () {
		this._handler = setTimeout(this._options.task.bind(this), this._options.interval)
	}


	if (QUnit) {
		var mark;

		function getTime() {
			return new Date().getTime()
		}

		function markTime() {
			mark = getTime()
		}

		function assertTimePoint(assert, standard, tolerateError) {
			var now = getTime() - mark
			assert.ok(Math.abs(now - standard) < tolerateError, 'time point is ' + now) // under tolerateError ms
		}


		QUnit.test('start and stop', function (assert) {
			assert.expect(10)
			var done = assert.async()
			markTime()


			var timer = new Timer({
				interval: 100,
				task: function () {
					assertTimePoint(assert, 100, 20) // under 5ms error
					markTime()
					this.next()
				}
			})

			setTimeout(function () {
				timer.stop()
				done()
			}, 1100)

			timer.start()
		})

		QUnit.test('immediately execute', function (assert) {
			markTime()
			var done = assert.async()
			var timer = new Timer({
				immediate: true,
				task: function () {
					assertTimePoint(assert, 0, 10) // execute at 0ms
					done()
				}
			})
			timer.start()
		})


		QUnit.test('stop and resume', function (assert) {
			markTime()
			var done = assert.async()
			var timer = new Timer({
				task: function () {
					assertTimePoint(assert, 1000, 10) // execute at 1000ms
					done()
				}
			})

			timer.start()

			setTimeout(function () {
				timer.stop()
				timer.resume()
			}, 400)
		})

		QUnit.test('stop and restart', function (assert) {
			markTime()
			var done = assert.async()
			var timer = new Timer({
				task: function () {
					assertTimePoint(assert, 1400, 10) // execute at 1400ms
					done()
				}
			})

			timer.start()

			setTimeout(function () {
				timer.stop()
				timer.start()
			}, 400)
		})
	}


	return Timer
})

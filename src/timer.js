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
	 */
	Timer.prototype.immediate = function () {
		this.stop()
		this._options.task.apply(this)
	}


	if (typeof QUnit != 'undefined') {
		var mark

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

		QUnit.test('immediately start', function (assert) {
			markTime()
			var done = assert.async()
			var count = 0
			var timer = new Timer({
				task: function () {
					count++
					if (count == 1) {
						assertTimePoint(assert, 0, 10) // execute at 0ms
						this.next() // test this.next()
					} else {
						assertTimePoint(assert, 1000, 20)
						done()
					}

				}
			})
			timer.start(true)
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


		QUnit.test('immediate task after start', function (assert) {
			markTime()
			var done = assert.async()
			var count = 0
			var timer = new Timer({
				task: function () {
					count++
					if (count == 1) {
						assertTimePoint(assert, 400, 10)
						this.next()
					} else {
						assertTimePoint(assert, 1400, 20)
						done()
					}
				}
			})

			setTimeout(function () {
				timer.immediate()
			}, 400)
		})
	}


	return Timer
})

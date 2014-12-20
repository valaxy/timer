define(function () {

	/**
	 * execute task repeatedly, can execute asyn task
	 * @param options
	 * @constructor
	 */
	var Interval = function (options) {
		this._options = {
			// whether execute the task immediatly
			immediate: (options && typeof options.immediate != 'undefined') ? options.immediate : false,
			// the interval time execute tasks
			interval: (options && typeof options.interval != 'undefined') ? options.interval : 1000
		}
		this._handler = null
		this._startTime = null
		this._restTime = null
	}


	/**
	 * start the timer or restart after stopping
	 */
	Interval.prototype.start = function () {
		this._startTime = new Date().getTime()
		this._restTime = null
		if (this._options.immediate) {
			this.task()
		} else {
			this._handler = setTimeout(this.task.bind(this), this._options.interval)
		}
	}


	/**
	 * stop the timer
	 */
	Interval.prototype.stop = function () {
		this._restTime = new Date().getTime() - this._startTime
		clearTimeout(this._handler)
	}


	/**
	 *
	 */
	Interval.prototype.recover = function () {
		this._startTime = new Date().getTime()
		this._handler = setTimeout(this.task.bind(this), this._restTime)
	}

	/**
	 * when your task is over, call this method to run next task at next time-point
	 */
	Interval.prototype.next = function () {
		this._handler = setTimeout(this.task.bind(this), this._options.interval); // 使用setTimeout保证间隔时间稳定
	}


	/**
	 * Implement the task method, call `this.next()` to end current task and begin to run next task
	 */
	Interval.prototype.task = function () {
		throw "Not set task: interval.task = function () { ... }"
	}


	if (QUnit) {
		QUnit.test('Interval', function (assert) {
			assert.expect(0) // qunit bug

			var interval = new Interval
			var lastTime = new Date().getTime()
			var count = 0
			interval.task = function () {
				var currentTime = new Date().getTime()
				var percent = Math.abs((currentTime - lastTime - 1000) / 1000.0)
				assert.ok(percent < 0.01, 'percent = ' + percent) // error limit to 1%

				lastTime = currentTime
				count++
				if (count == 10) {
					this.stop()
				} else {
					this.next()
				}
			}

			interval.start()
		})


		QUnit.test('Interval:stop', function (assert) {
			assert.expect(0)

			var interval = new Interval
			var count = 0
			interval.task = function () {
				if (count < 10) {
					count++
					this.next()
				}
			}
			interval.start()

			setTimeout(function () {
				interval.stop()
			}, 3300)
			setTimeout(function () {
				assert.equal(count, 3)
			}, 6000)
		})
	}


	return Interval
})

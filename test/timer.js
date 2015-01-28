define(function (require) {
	var Timer = require('src/timer')

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

})
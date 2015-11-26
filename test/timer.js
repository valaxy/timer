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

	QUnit.module('Timer')


	QUnit.test('start then stop', function (assert) {
		assert.expect(10)
		var done = assert.async()
		markTime()

		var timer = new Timer({
			interval: 100,
			task    : function (next) {
				assertTimePoint(assert, 100, 20) // under 5ms error
				markTime()
				next()
			}
		})

		setTimeout(function () {
			timer.stop()
			done()
		}, 1100)

		timer.start()
	})

	QUnit.test('start start and start', function (assert) {
		var done = assert.async()
		var timer = new Timer({
			interval: 100,
			task    : function (next) {
				assert.ok(true)
				next()
			}
		})
		timer.start()

		// after 10 times start, stop test
		var startCount = 0
		var handler = setInterval(function () {
			if (handler === null) return
			timer.start()
			startCount++
			if (startCount > 8) {
				clearInterval(handler)
				handler = null
			}
		}, 60)

		setTimeout(function () {
			timer.stop()
		}, 1050)
		setTimeout(function () {
			assert.expect(10)
			done()
		}, 1300)
	})


	QUnit.test('stop stop and stop', function (assert) {
		var done = assert.async()
		var timer = new Timer({
			interval: 100,
			task    : function (next) {
				assert.ok(true)
				next()
			}
		})
		timer.start()

		setTimeout(function () {
			timer.stop()
			timer.stop()
			timer.stop()
			timer.stop()
		}, 450)
		setTimeout(function () {
			assert.expect(4)
			done()
		}, 1000)
	})

	QUnit.test('immediately start', function (assert) {
		markTime()
		var done = assert.async()
		var count = 0
		var timer = new Timer({
			task: function (next) {
				count++
				if (count == 1) {
					assertTimePoint(assert, 0, 10) // execute at 0ms
					next() // test next()
				} else {
					assertTimePoint(assert, 1000, 20)
					done()
				}

			}
		})
		timer.start({immediate: true})
	})


	QUnit.test('stop then restart', function (assert) {
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


	QUnit.test('immediate()', function (assert) {
		markTime()
		var done = assert.async()
		var count = 0
		var timer = new Timer({
			interval: 1000,
			task    : function (next) {
				count++
				switch (count) {
					case 1:
						assertTimePoint(assert, 400, 10)
						next()
						break
					case 2:
						assertTimePoint(assert, 1400, 10)
						next()
						break
					case 3:
						throw new Error("can not be here")
				}

			}
		})

		timer.start()

		setTimeout(function () {
			timer.immediate()
		}, 400)

		setTimeout(function () {
			timer.stop()
			assert.expect(2)
			done()
		}, 2200)
	})

})
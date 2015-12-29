var Task = function (options) {
	this._fn = options.fn
	this._interval = options.interval
	this._isEnd = false
}


Task.prototype.exec = function (options) {
	var next = function () {
		setTimeout(function () {
			if (!this._isEnd) this._fn(next)
		}.bind(this), this._interval)
	}.bind(this)

	if (options.immediate) {
		this._fn(next)
	} else {
		next()
	}
}


Task.prototype.stop = function () {
	this._isEnd = true
}

module.exports = Task

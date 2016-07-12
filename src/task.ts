class Task {
    private _fn
    private _interval
    private _isEnd = false

    constructor(options) {
        this._fn       = options.fn
        this._interval = options.interval
    }

    exec(options) {
        var next = () => {
            setTimeout(()=> {
                if (!this._isEnd) this._fn(next)
            }, this._interval)
        }

        if (options.immediate) {
            this._fn(next)
        } else {
            next()
        }
    }

    stop() {
        this._isEnd = true
    }
}

export = Task

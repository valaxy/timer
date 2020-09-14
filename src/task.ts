export class Task {
    private _fn: Function
    private _interval: number
    private _isEnd = false

    constructor(options: {
        fn: Function,
        interval: number
    }) {
        this._fn = options.fn
        this._interval = options.interval
    }

    exec(options: {
        immediate?: boolean
    } = {}) {
        let next = () => {
            setTimeout(() => {
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
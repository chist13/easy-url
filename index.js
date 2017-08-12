class Events{
    /**
     * Create a new Events instance.
     */
    constructor() {
        this._stack = []
    }

    /**
     * push a callback to stack
     */
    subscribe(cb) {
        this._stack.push(cb)

        return () => this.unsubscribe(cb)
    }

    /**
     * remove a callback from stack
     */
    unsubscribe(target) {
        this._stack = this._stack.filter(e => e !== target)
    }

    /**
     * invoke every single callback in stack
     */
    emit() {
        this._stack.forEach(cb => cb())
    }
}

class Url{
    /**
     * Create a new Url instance.
     *
     * Events class as a dependency
     */
    constructor() {
        this.obj = {}
        this.search = '?'
        this.events = new Events()

        this._init()
    }

    /**
     * change obj and update url
     */
    push(key, value) {
        if (typeof key === 'object') {
            for (const prop in key) {
                this._silentPush(prop, key[prop])
            }
        } else {
            this._silentPush(key, value)
        }

        this._replaceUrl()
    }

    /**
     * remove prop form obj and update url
     *
     * remove all if no prop were provided
     */
    clear(key) {
        if (key != null) {
            this._silentPush(key, null)
        } else {
            for (let prop in this.obj)
                this._silentPush(prop, null)
        }

        this._replaceUrl()
    }

    /**
     * change property of obj without updating url
     */
    _silentPush(key, value) {
        value
            ? (this.obj[key] = value)
            : (delete this.obj[key])
    }

    /**
     * gets full url path
     */
    fullPath() {
        return location.pathname + this.search
    }

    /**
     * add listener to url changing
     */
    on(callback) {
        return this.events.subscribe(callback)
    }

    /**
     * remove listener
     */
    off(callback) {
        this.events.unsubscribe(callback)
    }

    /**
     * register listener which fires only once
     */
    once(callback) {
        const events = this.events

        events.subscribe(function func() {
            callback()
            events.unsubscribe(func)
        })
    }

    /**
     * apply changes to url and emit event
     */
    _replaceUrl() {
        const prevSearch = this.search
        this._updateSearch()

        if (prevSearch == this.search) {
            return
        }

        // in case you are using Turbolinks
        const stateObj = {turbolinks: true, url: this.search}

        history.replaceState(stateObj, null, this.search)
        this.events.emit()
    }

    /**
     * Reinit instance
     *
     * useful that querystring is changed by something else
     */
    _reinit() {
        this.obj = {}
        this.search = '?'

        this.init()
    }

    /**
     * Initializes params from current location
     */
    _init() {
        const url = location.search.replace(/^\?/, '')

        if (!url) {
            return
        }

        for (const e of url.split('&')) {
            const parts = e.split('=')

            this.obj[parts[0]] = parts[1]
        }

        this._updateSearch()
    }

    /**
     * Make search string from obj property
     */
    _updateSearch() {
        let array = []
        const obj = this.obj

        for (const key in obj) {
            array.push(`${key}=${obj[key]}`)
        }

        this.search = '?' + array.join('&')
    }
}

export default Url
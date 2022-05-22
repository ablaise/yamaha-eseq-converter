export default class Event {
    constructor(ticks, message) {
        this._ticks = ticks;
        this._message = message;
    }

    getTicks() {
        return this._ticks;
    }

    getMessage() {
        return this._message;
    }
}

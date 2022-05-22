export default class Message {
    static SKIP_BYTE_ID = 1;

    constructor(dv) {
        this._dv = dv;
        this._data = null;
        this._length = 0;
    }

    /**
     * Gets the data.
     */
    getData() {
        return this._data;
    }

    /**
     * Gets the data as string.
     */
    getDataAsString() {
        return new TextDecoder().decode(this.getData());
    }

    /**
     * Gets the total length of the message including the status byte.
     * This should be used as an offset.
     */
    getLength() {
        return this._length;
    }

    /**
     * Gets the DataView object.
     */
    getDataView() {
        return this._dv;
    }
}

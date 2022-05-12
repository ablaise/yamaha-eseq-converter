export default class Event {
    static HEADER_LENGTH = 0;

    constructor(dv) {
        this._dv = dv;
        this._data = null;
        this._dataLength = 0;
    }

    /**
     * Gets the data.
     */
    getData() {
        return this._data;
    }

    /**
     * Gets the data length.
     */
    getDataLength() {
        return this._dataLength;
    }

    /**
     * Gets the total length of the current section.
     */
    getLength() {
        return Event.HEADER_LENGTH + this.getDataLength();
    }

    /**
     * Gets the DataView object.
     */
    getDataView() {
        return this._dv;
    }
}

import Event from "./Event";

export default class SystemExclusiveEvent extends Event {
    static ID = 0xF0;
    static EVENT_ID = 7
    static HEADER_LENGTH = 0;

    constructor(dv) {
        super(dv);

        this._dataLength = dv.getUint8(0);
        this._data = dv.getString(SystemExclusiveEvent.HEADER_LENGTH, SystemExclusiveEvent.HEADER_LENGTH + this.getDataLength());
    }

    getLength() {
        return SystemExclusiveEvent.HEADER_LENGTH + this.getDataLength();
    }
}
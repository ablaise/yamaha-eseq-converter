import Event from "./Event";

export default class PolyphonicKeyPressureEvent extends Event {
    static ID = 0xA0;
    static EVENT_ID = 2;
    static DATA_LENGTH = 2;

    constructor(dv) {
        super(dv);

        this._pressure = dv.getUint8(0);
        this._note = dv.getUint8(1);
        this._dataLength = PolyphonicKeyPressureEvent.DATA_LENGTH;
    }

    getPressure() {
        return this._pressure;
    }

    getNode() {
        return this._note;
    }
}

import Event from "./Event";

export default class ChannelPressureEvent extends Event {
    static ID = 0xD0;
    static EVENT_ID = 5;
    static DATA_LENGTH = 1;

    constructor(dv) {
        super(dv);

        this._pressure = dv.getUint8(0);
        this._dataLength = ChannelPressureEvent.DATA_LENGTH;
    }

    getPressure() {
        return this._pressure;
    }
}

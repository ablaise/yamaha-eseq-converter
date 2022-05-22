import Message from "../../Message";

export default class ChannelPressure extends Message {
    static ID = 0xD0;
    static EVENT_ID = 5;
    static DATA_LENGTH = 1;

    constructor(dv) {
        super(dv);

        this._pressure = dv.getUint8(0);
        this._length = ChannelPressure.DATA_LENGTH;
    }

    getPressure() {
        return this._pressure;
    }
}

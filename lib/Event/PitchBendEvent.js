import Event from "./Event";

export default class PitchBendEvent extends Event {
    static ID = 0xE0;
    static EVENT_ID = 6;
    static DATA_LENGTH = 2;

    constructor(dv) {
        super(dv);

        this._lsb = dv.getUint8(0);
        this._msb = dv.getUint8(1);
        this._dataLength = PitchBendEvent.DATA_LENGTH;
    }

    getLSB() {
        return this._lsb;
    }

    getMSB() {
        return this._msb;
    }

    getValue() {
        return (this.getMSB() << 7) | this.getLSB();
    }
}

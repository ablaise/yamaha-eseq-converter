import Message from "../../Message";

export default class InstrumentChange extends Message {
    static ID = 0xC0;
    static EVENT_ID = 4;
    static DATA_LENGTH = 1;

    constructor(dv) {
        super(dv);

        this._instrument = dv.getUint8(0);
        this._length = InstrumentChange.DATA_LENGTH;
    }

    getInstrument() {
        return this._instrument;
    }
}

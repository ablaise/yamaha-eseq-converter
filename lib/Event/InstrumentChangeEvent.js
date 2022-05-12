import Event from "./Event";

export default class InstrumentChangeEvent extends Event {
    static ID = 0xC0;
    static EVENT_ID = 4;
    static DATA_LENGTH = 1;

    constructor(dv) {
        super(dv);

        this._instrument = dv.getUint8(0);
        this._dataLength = InstrumentChangeEvent.DATA_LENGTH;
    }

    getInstrument() {
        return this._instrument;
    }
}

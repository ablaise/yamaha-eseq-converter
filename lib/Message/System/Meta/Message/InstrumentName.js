import Message from "../../../Message";

export default class InstrumentName extends Message {
    static ID = 0x04;

    constructor(dv) {
        super(dv);

        this._length = dv.getUint8(0);
        this._data = dv.slice(1, 1 + this._length);
    }

    getLength() {
        return super.getLength() + 1;
    }
}

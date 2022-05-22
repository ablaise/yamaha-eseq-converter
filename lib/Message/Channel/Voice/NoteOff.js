import Message from "../../Message";

export default class NoteOff extends Message {
    static ID = 0x80;
    static EVENT_ID = 0;
    static DATA_LENGTH = 2;

    constructor(dv) {
        super(dv);

        this._note = dv.getUint8(0);
        this._velocity = dv.getUint8(1);
        this._length = NoteOff.DATA_LENGTH;
    }

    getNode() {
        return this._note;
    }

    getVelocity() {
        return this._velocity;
    }
}

import Event from "./Event";

export default class NoteOnEvent extends Event {
    static ID = 0x90;
    static EVENT_ID = 1;
    static DATA_LENGTH = 2;

    constructor(dv) {
        super(dv);

        this._note = dv.getUint8(0);
        this._velocity = dv.getUint8(1);
        this._dataLength = NoteOnEvent.DATA_LENGTH;
    }

    getNode() {
        return this._note;
    }

    getVelocity() {
        return this._velocity;
    }
}
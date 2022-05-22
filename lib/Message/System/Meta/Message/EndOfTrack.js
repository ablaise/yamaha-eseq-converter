import Message from "../../../Message";

export default class EndOfTrack extends Message {
    static ID = 0x2F;
    static LENGTH = 1;

    constructor(dv) {
        super(dv);

        this._length = EndOfTrack.LENGTH;
    }
}

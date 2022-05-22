import Message from "../../Message";

export default class SongPositionPointer extends Message {
    static ID = 0xF2;
    static LENGTH = 2;

    constructor(dv) {
        super(dv);

        this._length = SongPositionPointer.LENGTH;
    }
}

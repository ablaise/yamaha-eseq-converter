import Message from "../../../Message";

export default class SequenceNumber extends Message {
    static ID = 0x00;
    static LENGTH = 2;

    constructor(dv) {
        super(dv);

        this._length = SequenceNumber.LENGTH;
    }
}

import Message from "../../Message";

export default class QuarterFrame extends Message {
    static ID = 0xF1;
    static LENGTH = 1;

    constructor(dv) {
        super(dv);

        this._length = QuarterFrame.LENGTH;
    }
}

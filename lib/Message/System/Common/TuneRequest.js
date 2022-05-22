import Message from "../../Message";

export default class TuneRequest extends Message {
    static ID = 0xF6;
    static LENGTH = 0;

    constructor(dv) {
        super(dv);

        this._length = TuneRequest.LENGTH;
    }
}

import Message from "../../Message";

export default class Stop extends Message {
    static ID = 0xFC;

    constructor(dv) {
        super(dv);
    }
}

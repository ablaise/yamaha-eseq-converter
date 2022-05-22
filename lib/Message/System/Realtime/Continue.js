import Message from "../../Message";

export default class Continue extends Message {
    static ID = 0xFB;

    constructor(dv) {
        super(dv);
    }
}

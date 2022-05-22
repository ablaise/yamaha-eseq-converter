import Message from "../../Message";

export default class Start extends Message {
    static ID = 0xFA;

    constructor(dv) {
        super(dv);
    }
}

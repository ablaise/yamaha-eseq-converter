import Message from "../../Message";

export default class Clock extends Message {
    static ID = 0xF8;

    constructor(dv) {
        super(dv);
    }
}

import Message from "../../Message";

export default class ActiveSense extends Message {
    static ID = 0xFE;

    constructor(dv) {
        super(dv);
    }
}

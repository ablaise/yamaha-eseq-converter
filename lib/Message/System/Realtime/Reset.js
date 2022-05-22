import Message from "../../Message";

/**
 * This one should not be used.
 */
export default class Reset extends Message {
    static ID = 0xFF;

    constructor(dv) {
        super(dv);
    }
}

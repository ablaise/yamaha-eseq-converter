import Message from "../../Message";

export default class SongSelect extends Message {
    static ID = 0xF3;
    static LENGTH = 1;

    constructor(dv) {
        super(dv);

        this._length = SongSelect.LENGTH;
    }
}

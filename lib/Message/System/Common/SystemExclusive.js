import Message from "../../Message";

export default class SystemExclusive extends Message {
    static ID = 0xF0;

    constructor(dv) {
        super(dv);

        this._manufacturerId = dv.getUint8(0);

        let bytes = [];
        let byte = 0;
        let offset = 1;

        do {
            byte = dv.getUint8(offset);
            bytes.push(byte);
            offset++;
        } while (byte !== 0xF7);

        this._data = new Uint8Array(bytes);
        this._length = this._data.length;
    }

    getManufacturerId() {
        return this._manufacturerId;
    }
}

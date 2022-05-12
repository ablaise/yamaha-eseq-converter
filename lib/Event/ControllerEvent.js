import Event from "./Event";

export default class ControllerEvent extends Event {
    static ID = 0xB0;
    static EVENT_ID = 3;
    static DATA_LENGTH = 2;

    constructor(dv) {
        super(dv);

        this._controller = dv.getUint8(0);
        this._value = dv.getUint8(1);
        this._dataLength = ControllerEvent.DATA_LENGTH;
    }

    getController() {
        return this._controller;
    }

    getValue() {
        return this._value;
    }
}

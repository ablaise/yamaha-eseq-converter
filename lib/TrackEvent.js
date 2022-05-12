import Utils from "./Utils";
import NoteOffEvent from "./Event/NoteOffEvent";
import NoteOnEvent from "./Event/NoteOnEvent";
import PolyphonicKeyPressureEvent from "./Event/PolyphonicKeyPressureEvent";
import ControllerEvent from "./Event/ControllerEvent";
import InstrumentChangeEvent from "./Event/InstrumentChangeEvent";
import ChannelPressureEvent from "./Event/ChannelPressureEvent";
import PitchBendEvent from "./Event/PitchBendEvent";
import SystemExclusiveEvent from "./Event/SystemExclusiveEvent";
import MetaEvent from "./Event/MetaEvent";
import Event from "./Event/Event";
import Midi from "./Midi";

export default class TrackEvent extends Event {
    static ID = 0xFF;
    static HEADER_LENGTH = 3;

    constructor(index, dv) {
        super(dv);
        this._dv = dv;

        let offset = 0;
        let id = 0;
        let lastId = 0;
        let event = null;
        let eventDv = null;
        const customEvent = new CustomEvent(Midi.EVENT_ID);

        while (offset < this._dv.byteLength) {
            // first bytes are variable-length quantity
            const vql = Utils.readVLQ(this._dv.slice(offset, offset + 4));

            /**
             * Not used for this library yet.
             */
            this._detaTime = this._dv.slice(offset, offset + vql.length);

            // move the offset after reading the timestamp
            offset += vql.length;

            // reading the current id
            id = this._dv.getUint8(offset);

            // triggers the id event
            customEvent.data = {
                id: id,
                index: index,
                offset: offset,
                dv: this._dv
            };
            window.dispatchEvent(customEvent);

            // use the stored identifier if the current byte is in running-status
            if (Utils.isRunningStatus(id)) {
                id = lastId;
            } else {
                // the current identifier is kept in memory if it's not a running-status
                lastId = id;
                offset++;
            }

            // data to give to the following event
            eventDv = this._dv.resize(offset);

            switch (Utils.getEventId(id)) {
                case NoteOffEvent.EVENT_ID:
                    event = new NoteOffEvent(eventDv);
                    break;
                case NoteOnEvent.EVENT_ID:
                    event = new NoteOnEvent(eventDv);
                    break;
                case PolyphonicKeyPressureEvent.EVENT_ID:
                    event = new PolyphonicKeyPressureEvent(eventDv);
                    break;
                case ControllerEvent.EVENT_ID:
                    event = new PolyphonicKeyPressureEvent(eventDv);
                    break;
                case InstrumentChangeEvent.EVENT_ID:
                    event = new InstrumentChangeEvent(eventDv);
                    break;
                case ChannelPressureEvent.EVENT_ID:
                    event = new ChannelPressureEvent(eventDv);
                    break;
                case PitchBendEvent.EVENT_ID:
                    event = new PitchBendEvent(eventDv);
                    break;
                default:
                    if (id === MetaEvent.ID) {
                        event = new MetaEvent(eventDv);
                        break;
                    }

                    event = new SystemExclusiveEvent(eventDv);
                    break;
            }

            offset += event.getLength();
        }

    }

    /**
     * Gets the DataView object.
     */
    getDataView() {
        return this._dv;
    }
}

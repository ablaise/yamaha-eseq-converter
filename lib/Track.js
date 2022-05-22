import EventFactory from "./EventFactory";
import Utils from "./Utils";
import Midi from "./Midi";

export default class Track {
    static HEADER_LENGTH = 8;

    constructor(dv, index) {
        this._dv = dv;
        this._index = index;
        this._events = [];
        this._idEvent = new CustomEvent(Midi.EVENT_ID);

        this._signature = this._dv.getString(0, 4);
        if ('MTrk' !== this._signature) {
            throw 'Invalid MTrk header.';
        }

        // length of the track chunk
        this._dataDataLength = this._dv.getUint32(4);

        // resize to get the data chunk
        this.trackEventDv = this._dv.resize(Track.HEADER_LENGTH, this.getLength());

        // handle the track events
        this.handleData();
    }

    /**
     * Gets the signature.
     */
    getSignature() {
        return this._signature;
    }

    /**
     * Gets the track events.
     */
    getEvents() {
        return this._events;
    }

    /**
     * Gets the total length of the current section.
     */
    getLength() {
        return Track.HEADER_LENGTH + this.getDataLength();
    }

    /**
     * Gets the data length.
     */
    getDataLength() {
        return this._dataDataLength;
    }

    /**
     * Gets the DataView object.
     */
    getDataView() {
        const header = this._dv.slice(0, Track.HEADER_LENGTH);
        const data = this.trackEventDv;

        return Utils.joinDataView([header, data]);
    }

    /**
     * @private
     */
    handleData() {
        const dv = this.trackEventDv;
        let offset = 0;
        let lastId = 0;
        let event = null;

        while (offset < dv.byteLength) {
            // first bytes are variable-length quantity
            const vql = Utils.readVLQ(dv.slice(offset, offset + 4));

            /**
             * Not used for this library yet.
             */
            const deltaTime = dv.slice(offset, offset + vql.length);

            // move the offset after reading the timestamp
            offset += vql.length;

            // reading the current id
            let id = dv.getUint8(offset);

            // triggers the id event
            this.dispatch(id, offset, dv);

            // use the stored identifier if the current byte is in running-status
            if (Utils.isRunningStatus(id)) {
                id = lastId;
            } else {
                // the current identifier is kept in memory if it's not a running-status
                lastId = id;
                offset++;
            }

            // process the current event
            const eventDv = dv.resize(offset);
            event = EventFactory.getEvent(id, deltaTime, eventDv);
            this._events.push(event);

            // move to the next event
            offset += event.getMessage().getLength();
        }
    }

    /**
     * @private
     */
    dispatch(id, offset, dv) {
        this._idEvent.data = {
            id: id,
            index: this._index,
            offset: offset,
            dv: dv
        };

        window.dispatchEvent(this._idEvent);
    }
}

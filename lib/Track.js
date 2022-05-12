import TrackEvent from "./TrackEvent";
import Utils from "./Utils";

export default class Track {
    static HEADER_LENGTH = 8;

    constructor(dv, index) {
        this._dv = dv;
        this._index = index;

        this._signature = this._dv.getString(0, 4);
        if ('MTrk' !== this._signature) {
            throw 'Invalid MTrk header.';
        }

        // length of the track chunk
        this._dataDataLength = this._dv.getUint32(4);

        // resize a data chunk
        const trackEventDv = this._dv.resize(Track.HEADER_LENGTH, this.getLength());

        this._event = new TrackEvent(this._index, trackEventDv);
    }

    /**
     * Gets the signature.
     */
    getSignature() {
        return this._signature;
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
        const event = this._event.getDataView();

        return Utils.joinDataView([header, event]);
    }
}

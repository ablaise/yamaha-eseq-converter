import Track from "./Track";
import Utils from "./Utils";

export default class Header {
    static HEADER_LENGTH = 14;

    constructor(dv) {
        this._dv = dv;

        this._signature = this._dv.getString(0, 4);
        if ('MThd' !== this._signature) {
            throw 'Invalid MThd header.';
        }

        this._dataLength = this._dv.getUint32(4);
        this._type = this._dv.getUint16(8);
        this._tracksCount = this._dv.getUint16(10);
        this._ticksPerQuarterNote = this._dv.getUint16(12);

        let offset = 0;
        this._tracks = [];
        for (let i = 0; i < this.getTracksCount(); ++i) {
            let trackDv = this._dv.resize(Header.HEADER_LENGTH + offset);
            this._tracks.push(new Track(trackDv, i));
            offset += this._tracks[i].getLength();
        }
    }

    /**
     * Gets the Track object array.
     */
    getTracks() {
        return this._tracks;
    }

    /**
     * Gets the signature.
     */
    getSignature() {
        return this._signature;
    }

    /**
     * Gets the tempo.
     */
    getTicksPerQuarterNote() {
        return this._ticksPerQuarterNote;
    }

    /**
     * Gets the number of tracks.
     */
    getTracksCount() {
        return this._tracksCount;
    }

    /**
     * Gets the type.
     */
    getType() {
        return this._type;
    }

    /**
     * Gets the total length of the current section.
     */
    getLength() {
        return Header.HEADER_LENGTH + this.getDataLength();
    }

    /**
     * Gets the data length.
     */
    getDataLength() {
        return this._dataLength;
    }

    /**
     * Gets the DataView object.
     */
    getDataView() {
        const header = this._dv.slice(0, Header.HEADER_LENGTH);

        let tracksDv = [];
        tracksDv.push(header);
        let tracks = this.getTracks();
        for (let i = 0; i < tracks.length; ++i) {
            tracksDv.push(tracks[i].getDataView());
        }

        return Utils.joinDataView(tracksDv);
    }
}

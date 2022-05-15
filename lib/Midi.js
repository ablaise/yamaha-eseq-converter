import Header from "./Header";

export default class Midi {
    static EVENT_READY = 'midi-ready';
    static EVENT_ID = 'midi-id';

    static TRACKS = {
        PIANO_LEFT_HAND: 0,
        PIANO_RIGHT_HAND: 1,
        CONTINUOUS_CONTROLLER_PEDAL_DATA: 2,
        INSTRUMENTAL_PARTS_CH4: 3,
        INSTRUMENTAL_PARTS_CH5: 4,
        INSTRUMENTAL_PARTS_CH6: 5,
        INSTRUMENTAL_PARTS_CH7: 6,
        INSTRUMENTAL_PARTS_CH8: 7,
        INSTRUMENTAL_PARTS_CH9: 8,
        RHYTHM_PART: 9,
        INSTRUMENTAL_PARTS_CH11: 10,
        INSTRUMENTAL_PARTS_CH12: 11,
        INSTRUMENTAL_PARTS_CH13: 12,
        INSTRUMENTAL_PARTS_CH14: 13,
        INSTRUMENTAL_PARTS_CH15: 14,
        INSTRUMENTAL_PARTS_CH16: 15
    };

    constructor(options) {
        this._dv = null;
        this._ready = false;
        this.autorun = options.autorun || false;
        this._readyEvent = new CustomEvent(Midi.EVENT_READY);

        if (options.path) {
            this.loadPath(options.path);
        } else if (options.buffer) {
            this.load(options.buffer);
        } else {
            throw 'You must specify either "path" or "buffer".';
        }
    }

    /**
     * Loads a path to a midi file and dispatches the ready event.
     *
     * @type {string}
     */
    loadPath(file) {
        const http = new XMLHttpRequest();
        http.open('GET', file, true);
        http.responseType = 'arraybuffer';

        http.onload = (event) => {
            const response = http.response;
            if (response) {
                this.load(response);
            }
        };

        http.send(null);
    }

    /**
     * Loads an ArrayBuffer and dispatches the ready event.
     *
     * @type {ArrayBuffer}
     */
    load(data) {
        this.register();

        // get a DataView object from the ArrayBuffer
        this._dv = new DataView(data);
        if (this.autorun) {
            this.run();
        }

        // triggers the load event
        this._readyEvent.data = {
            context: this
        };
        window.dispatchEvent(this._readyEvent);
    }

    /**
     * Starts processing the midi file.
     */
    run() {
        this.header = new Header(this._dv);
        this._ready = true;
    }

    /**
     * Downloads the output midi file.
     */
    download() {
        if (!this._ready) {
            this.run();
        }

        const dv = this.header.getDataView();
        const data = new Uint8Array(dv.buffer);
        const blob = new Blob([data], {type: 'audio/midi'});

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "file.mid";
        link.click();
    }

    /**
     * Gets the Header object.
     */
    getHeader() {
        return this.header;
    }

    /**
     * Gets the DataView object.
     */
    getDataView() {
        return this._dv;
    }

    /**
     * Registers utility methods to the DataView object.
     *
     * @private
     */
    register() {
        DataView.prototype.slice = function (offset, length) {
            const buffer = this.buffer.slice(offset, length);
            return new Uint8Array(buffer);
        };

        DataView.prototype.getString = function (offset, length) {
            const data = this.slice(offset, length);
            return new TextDecoder().decode(data);
        };

        DataView.prototype.resize = function (offset, end) {
            const data = this.slice(offset, end || this.byteLength);
            return new DataView(data.buffer);
        }
    }
}

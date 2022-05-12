import Event from "./Event";

export default class MetaEvent extends Event {
    static ID = 0xFF;
    static HEADER_LENGTH = 2;

    static SEQUENCE_NUMBER = 0x00;
    static TEXT_EVENT = 0x01;
    static COPYRIGHT_NOTICE = 0x02;
    static SEQUENCE_OR_TRACK_NAME = 0x03;
    static INSTRUMENT_NAME = 0x04;
    static LYRIC_TEXT = 0x05;
    static MARKER_TEXT = 0x06;
    static CUE_POINT = 0x07;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH1 = 0x20;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH2 = 0x21;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH3 = 0x22;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH4 = 0x23;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH5 = 0x24;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH6 = 0x25;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH7 = 0x26;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH8 = 0x27;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH9 = 0x28;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH10 = 0x29;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH11 = 0x2A;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH12 = 0x2B;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH13 = 0x2C;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH14 = 0x2D;
    static MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH15 = 0x2E;
    static END_OF_TRACK = 0x2F;
    static TEMPO_SETTING = 0x51;
    static SMPTE_OFFSET = 0x54;
    static TIME_SIGNATURE = 0x58;
    static KEY_SIGNATURE = 0x59;
    static SEQUENCER_SPECIFIC_EVENT = 0x7F;

    constructor(dv) {
        super(dv);

        const type = dv.getUint8(0);
        switch (type) {
            case MetaEvent.SEQUENCE_NUMBER:
            case MetaEvent.TEXT_EVENT:
            case MetaEvent.COPYRIGHT_NOTICE:
            case MetaEvent.SEQUENCE_OR_TRACK_NAME:
            case MetaEvent.INSTRUMENT_NAME:
            case MetaEvent.LYRIC_TEXT:
            case MetaEvent.MARKER_TEXT:
            case MetaEvent.CUE_POINT:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH1:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH2:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH3:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH4:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH5:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH6:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH7:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH8:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH9:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH10:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH11:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH12:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH13:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH14:
            case MetaEvent.MIDI_CHANNEL_PREFIX_ASSIGNMENT_CH15:
            case MetaEvent.END_OF_TRACK:
            case MetaEvent.TEMPO_SETTING:
            case MetaEvent.SMPTE_OFFSET:
            case MetaEvent.TIME_SIGNATURE:
            case MetaEvent.KEY_SIGNATURE:
            case MetaEvent.SEQUENCER_SPECIFIC_EVENT:
                this._dataLength = dv.getUint8(1);
                this._data = dv.getString(MetaEvent.HEADER_LENGTH, MetaEvent.HEADER_LENGTH + this.getDataLength());
                break;
            default:
                console.error(type.toString(16));
                throw 'Unknown MetaEvent Type.';
        }
    }

    getLength() {
        return MetaEvent.HEADER_LENGTH + this.getDataLength();
    }
}

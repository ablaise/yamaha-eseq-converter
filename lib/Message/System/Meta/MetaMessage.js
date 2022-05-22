import Message from "../../Message";
import Text from "./Message/Text";
import CopyrightNotice from "./Message/CopyrightNotice";
import TrackName from "./Message/TrackName";
import InstrumentName from "./Message/InstrumentName";
import Lyric from "./Message/Lyric";
import MarkerText from "./Message/MarkerText";
import CuePoint from "./Message/CuePoint";
import SequencerSpecific from "./Message/SequencerSpecific";
import SequenceNumber from "./Message/SequenceNumber";
import ChannelPrefix from "./Message/ChannelPrefix";
import EndOfTrack from "./Message/EndOfTrack";
import TempoSetting from "./Message/TempoSetting";
import SMPTEOffset from "./Message/SMPTEOffset";
import TimeSignature from "./Message/TimeSignature";
import KeySignature from "./Message/KeySignature";
import PortPrefix from "./Message/PortPrefix";

export default class MetaMessage extends Message {
    static ID = 0xFF;
    static SKIP_BYTE_ID = 1;

    constructor(dv) {
        super(dv);

        this._event = null;
        this._metaType = dv.getUint8(0);

        // message data
        dv = dv.resize(1);

        const type = this.getMetaType();
        switch (type) {
            case Text.ID:
                this._event = new Text(dv);
                break;
            case CopyrightNotice.ID:
                this._event = new CopyrightNotice(dv);
                break;
            case TrackName.ID:
                this._event = new TrackName(dv);
                break;
            case InstrumentName.ID:
                this._event = new InstrumentName(dv);
                break;
            case Lyric.ID:
                this._event = new Lyric(dv);
                break;
            case MarkerText.ID:
                this._event = new MarkerText(dv);
                break;
            case CuePoint.ID:
                this._event = new CuePoint(dv);
                break;
            case SequencerSpecific.ID:
                this._event = new SequencerSpecific(dv);
                break;
            case SequenceNumber.ID:
                this._event = new SequenceNumber(dv);
                break;
            case ChannelPrefix.ID:
                this._event = new ChannelPrefix(dv);
                break;
            case PortPrefix.ID:
                this._event = new PortPrefix(dv);
                break;
            case EndOfTrack.ID:
                this._event = new EndOfTrack(dv);
                break;
            case TempoSetting.ID:
                this._event = new TempoSetting(dv);
                break;
            case SMPTEOffset.ID:
                this._event = new SMPTEOffset(dv);
                break;
            case TimeSignature.ID:
                this._event = new TimeSignature(dv);
                break;
            case KeySignature.ID:
                this._event = new KeySignature(dv);
                break;
            default:
                throw `Unknown event type 0x${type.toString(16)}.`;
        }

        this._length = this._event.getLength();
    }

    /**
     * Gets the meta type id.
     */
    getMetaType() {
        return this._metaType;
    }

    /**
     * Gets the event object.
     */
    getEvent() {
        return this._event;
    }

    getLength() {
        return MetaMessage.SKIP_BYTE_ID + this._event.getLength();
    }
}

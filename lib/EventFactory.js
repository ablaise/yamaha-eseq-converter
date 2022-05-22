import Utils from "./Utils";
import Event from "./Event";
import NoteOff from "./Message/Channel/Voice/NoteOff";
import MetaMessage from "./Message/System/Meta/MetaMessage";
import SystemExclusive from "./Message/System/Common/SystemExclusive";
import SongPositionPointer from "./Message/System/Common/SongPositionPointer";
import SongSelect from "./Message/System/Common/SongSelect";
import TuneRequest from "./Message/System/Common/TuneRequest";
import QuarterFrame from "./Message/System/Common/QuarterFrame";
import Start from "./Message/System/Realtime/Start";
import Continue from "./Message/System/Realtime/Continue";
import Stop from "./Message/System/Realtime/Stop";
import ActiveSense from "./Message/System/Realtime/ActiveSense";
import Reset from "./Message/System/Realtime/Reset";
import NoteOn from "./Message/Channel/Voice/NoteOn";
import PolyphonicKeyPressure from "./Message/Channel/Voice/PolyphonicKeyPressure";
import ControlChange from "./Message/Channel/Voice/ControlChange";
import InstrumentChange from "./Message/Channel/Voice/InstrumentChange";
import ChannelPressure from "./Message/Channel/Voice/ChannelPressure";
import PitchBend from "./Message/Channel/Voice/PitchBend";

export default class EventFactory {
    static getEvent(id, deltaTime, dv) {
        if (id === MetaMessage.ID) {
            return new Event(deltaTime, new MetaMessage(dv));
        }

        // System common
        switch (id) {
            case SystemExclusive.ID:
                return new Event(deltaTime, new SystemExclusive(dv));
            case QuarterFrame.ID:
                return new Event(deltaTime, new QuarterFrame(dv));
            case SongPositionPointer.ID:
                return new Event(deltaTime, new SongPositionPointer(dv));
            case SongSelect:
                return new Event(deltaTime, new SongSelect(dv));
            case TuneRequest.ID:
                return new Event(deltaTime, new TuneRequest(dv));
        }

        // System realtime
        switch (id) {
            case Start:
                return new Event(deltaTime, new Start(dv));
            case Continue:
                return new Event(deltaTime, new Continue(dv));
            case Stop:
                return new Event(deltaTime, new Stop(dv));
            case ActiveSense:
                return new Event(deltaTime, new ActiveSense(dv));
            case Reset:
                //return new Event(id, deltaTime, new Reset(dv));
                throw 'Unhandled "Reset" event.'
        }

        // Voice
        switch (Utils.getEventId(id)) {
            case NoteOff.EVENT_ID:
                return new Event(deltaTime, new NoteOff(dv));
            case NoteOn.EVENT_ID:
                return new Event(deltaTime, new NoteOn(dv));
            case PolyphonicKeyPressure.EVENT_ID:
                return new Event(deltaTime, new PolyphonicKeyPressure(dv));
            case ControlChange.EVENT_ID:
                return new Event(deltaTime, new ControlChange(dv));
            case InstrumentChange.EVENT_ID:
                return new Event(deltaTime, new InstrumentChange(dv));
            case ChannelPressure.EVENT_ID:
                return new Event(deltaTime, new ChannelPressure(dv));
            case PitchBend.EVENT_ID:
                return new Event(deltaTime, new PitchBend(dv));
        }

        throw `Unknown event 0x${id.toString(16)}.`
    }
}

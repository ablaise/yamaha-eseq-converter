import Utils from "../lib/Utils";
import NoteOffEvent from "../lib/Event/NoteOffEvent";
import PitchBendEvent from "../lib/Event/PitchBendEvent";
import SystemExclusiveEvent from "../lib/Event/SystemExclusiveEvent";
import NoteOnEvent from "../lib/Event/NoteOnEvent";
import PolyphonicKeyPressureEvent from "../lib/Event/PolyphonicKeyPressureEvent";
import ControllerEvent from "../lib/Event/ControllerEvent";
import InstrumentChangeEvent from "../lib/Event/InstrumentChangeEvent";
import ChannelPressureEvent from "../lib/Event/ChannelPressureEvent";

describe('Midi tests suite', function () {
    const vlqDataSet = [
        {data: [0x7F], length: 1},
        {data: [0x81, 0x7F], length: 2},
        {data: [0x82, 0x80, 0x00], length: 3},
    ];

    const eventsDataSet = [
        {data: 0x80, event: NoteOffEvent.EVENT_ID},
        {data: 0x90, event: NoteOnEvent.EVENT_ID},
        {data: 0xA0, event: PolyphonicKeyPressureEvent.EVENT_ID},
        {data: 0xB0, event: ControllerEvent.EVENT_ID},
        {data: 0xC0, event: InstrumentChangeEvent.EVENT_ID},
        {data: 0xD0, event: ChannelPressureEvent.EVENT_ID},
        {data: 0xE0, event: PitchBendEvent.EVENT_ID},
        {data: 0xF0, event: SystemExclusiveEvent.EVENT_ID},
        //{data: 0xFF, event: MetaEvent.ID},
    ];

    it('should have a correct length', function () {
        vlqDataSet.forEach(function (data) {
            const vlq = Utils.readVLQ(new Uint8Array(data.data));
            expect(vlq.length).toBe(data.length);
        });
    });

    it('should be a correct event number', function () {
        eventsDataSet.forEach(function (data) {
            const id = Utils.getEventId(data.data);
            expect(id).toBe(data.event);
        });
    });
});
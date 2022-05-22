import Utils from "../lib/Utils";
import NoteOff from "../lib/Message/Channel/Voice/NoteOff";
import NoteOn from "../lib/Message/Channel/Voice/NoteOn";
import PolyphonicKeyPressure from "../lib/Message/Channel/Voice/PolyphonicKeyPressure";
import ControlChange from "../lib/Message/Channel/Voice/ControlChange";
import InstrumentChange from "../lib/Message/Channel/Voice/InstrumentChange";
import ChannelPressure from "../lib/Message/Channel/Voice/ChannelPressure";
import PitchBend from "../lib/Message/Channel/Voice/PitchBend";

describe('Midi tests suite', function () {
    const vlqDataSet = [
        {data: [0x7F], length: 1},
        {data: [0x81, 0x7F], length: 2},
        {data: [0x82, 0x80, 0x00], length: 3},
    ];

    const eventsDataSet = [
        {data: 0x80, event: NoteOff.EVENT_ID},
        {data: 0x90, event: NoteOn.EVENT_ID},
        {data: 0xA0, event: PolyphonicKeyPressure.EVENT_ID},
        {data: 0xB0, event: ControlChange.EVENT_ID},
        {data: 0xC0, event: InstrumentChange.EVENT_ID},
        {data: 0xD0, event: ChannelPressure.EVENT_ID},
        {data: 0xE0, event: PitchBend.EVENT_ID}
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

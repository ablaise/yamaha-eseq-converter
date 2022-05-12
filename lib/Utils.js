export default class Utils {
    /**
     * Gets the event number of an identifier.
     */
    static getEventId(id) {
        return (id & 0x7F) >> 4;
    }

    /**
     * Gets the variable-length quantity.
     */
    static readVLQ(data) {
        let value = 0;
        let length = 1;

        for (let i = 0; i < 4; ++i) {
            let mask = data[i] & 0x80;
            if (!mask) {
                break;
            }

            value |= (data[i] & 0x7F) << 7;
            length++;
        }

        return {
            value: value,
            length: length
        };
    }

    /**
     * Assigns a channel to an identifier.
     */
    static setChannel(id, channel) {
        return (id & 0xF0) + channel;
    }

    /**
     * Can an identifier change channel.
     */
    static isChannelAssignable(id) {
        return !Utils.isRunningStatus(id) && id < 0xF0;
    }

    /**
     * Is the identifier a valid event.
     */
    static isRunningStatus(id) {
        return id < 0x80;
    }

    /**
     * Combines multiple DataView objects.
     */
    static joinDataView(data) {
        let length = 0;
        for (let i = 0; i < data.length; ++i) {
            length += data[i].byteLength;
        }

        let offset = 0;
        const temp = new Uint8Array(length);
        for (let i = 0; i < data.length; ++i) {
            if (i > 0) {
                offset += data[i - 1].byteLength;
            }
            temp.set(new Uint8Array(data[i].buffer), offset);
        }

        return new DataView(temp.buffer);
    }
}

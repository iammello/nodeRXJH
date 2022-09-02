import BufferReader from "buffer-reader";
import Session from "../session";

class ReqAuthPacket {
    session: Session;
    reader: BufferReader;

    /**
     * This function takes a session and a buffer and returns a new instance of the class.
     * @param {Session} session - The session object that was created when the client connected to the
     * server.
     * @param {Buffer} data - Buffer
     */
    constructor(session: Session, data: Buffer) {
        this.session = session;
        this.reader = new BufferReader(data);
    }

    /**
     * It reads a 16-bit unsigned integer, then reads a string of that length, then reads another
     * 16-bit unsigned integer, then reads another string of that length
     */
    process() {
        let name_length = this.reader.nextUInt16LE();
        let name = this.reader.nextString(name_length);

        let pwd_length = this.reader.nextUInt16LE();
        let password = this.reader.nextString(pwd_length);

        this.session.authService.authenticate(name, password);
    }
}

export default ReqAuthPacket;
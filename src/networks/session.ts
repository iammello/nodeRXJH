import * as net from 'net';
import BufferReader from 'buffer-reader';
import logger from '../utilities/log';
import reqs from './req_opcodes';
import AuthService from '../services/auth_service';
import { v4 as uuidv4 } from 'uuid';

class Session {
    protected socket: net.Socket;

    public uid: string;
    public authService: AuthService;

    /**
     * The constructor function for the Session class takes a socket as a parameter and assigns it to
     * the socket property of the class, and then assigns a new AuthService object to the authService
     * property of the class.
     * @param socket - net.Socket
     */
    constructor(socket: net.Socket) {
        this.uid = uuidv4();
        this.socket = socket;
        this.authService = new AuthService(this);

        logger.info(`New Session[${this.uid}] from ${socket.remoteAddress}:${socket.remotePort}`);

        this.onDataReceived = this.onDataReceived.bind(this)

        socket.on('close', this.onClose);
        socket.on('data', this.onDataReceived);
    }

    /**
     * It reads the opcode from the buffer, then it reads the packet length from the buffer, then it
     * reads the packet data from the buffer, then it gets the packet class from the opcode, then it
     * creates a new instance of the packet class, then it logs the packet, then it processes the
     * packet
     * @param {Buffer} data - Buffer - The data received from the client.
     */
    onDataReceived(data: Buffer) {
        const reader = new BufferReader(data);
        let opcode = reader.nextUInt16LE();
        let packet_length = reader.nextUInt16LE();
        let packet_data = reader.nextBuffer(packet_length);

        const classPacket = reqs.get(opcode)
        const packet = new classPacket(this, packet_data);

        logger.trace(`Received packet opcode: ${classPacket.name}[${packet_length}]`);

        packet.process();
    }

    /**
     * When a session is closed, log the session's uid and whether or not the session had an error.
     * @param {boolean} hadError - A boolean value indicating whether the session was closed due to a
     * transmission error.
     */
    onClose(hadError: boolean) {
        logger.info(`Disconnect Session[${this.uid}] - hadError: ${hadError}`);
    }

    /**
     * The function takes a Buffer as an argument and writes it to the socket
     * @param {Buffer} data - The data to send.
     */
    send(data: Buffer) {
        this.socket.write(data);
    }
}

export default Session;
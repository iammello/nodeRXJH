import * as net from 'net';
import logger from '../utilities/log';
import Session from './session';

class TcpListener {
    PORT: number;
    IP: string;
    BACKLOG: number;

    Sessions: Session[];

    /**
     * The constructor function takes in three parameters, ip, port, and backlog, and assigns them to
     * the class variables IP, PORT, and BACKLOG
     * @param {string} ip - The IP address to bind to.
     * @param {number} port - The port to listen on.
     * @param {number} backlog - The maximum length of the queue of pending connections.
     */
    constructor(ip: string, port: number, backlog: number) {
        this.IP = ip;
        this.PORT = port;
        this.BACKLOG = backlog;
        this.Sessions = [];
    }

    /**
     * Start TcpListener at ${this.IP}:${this.PORT}
     */
    start () {
        logger.info(`Start TcpListener at ${this.IP}:${this.PORT}`);

        net.createServer()
            .listen(this.PORT, this.IP, this.BACKLOG)
            .on('connection', socket => {
                // todo create Session
                let session = new Session(socket);
                this.Sessions.push(session);
            })
    }
}

export default TcpListener;
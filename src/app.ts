import TcpListener from "./networks/tcp_listener";
import logger from './utilities/log';

class App {
    
    tcpListener: TcpListener;

    constructor() {
        logger.info('Start App');

        this.tcpListener = new TcpListener('127.0.0.1', 1300, 100);
        this.tcpListener.start();
    }
}

export default App;
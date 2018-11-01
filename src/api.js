import dgram from 'dgram';
import db from './db';
import { checkIfFinalPacket } from './helpers';

export default class API {
  static getUT99ServerStatus(host, port) {
    return new Promise((resolve, reject) => {
      try {
        let status = '';
        const socket = dgram.createSocket('udp4');
        const datagram = '\\status\\';

        socket.send(datagram, port, host, err => {
          if (err) throw err;
        });

        socket.on('message', (message, remote) => {
          status = status.concat(message.toString());
          if (checkIfFinalPacket(message.toString())) {
            resolve(status);
            return socket.close();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static getObjectFromDB() {
    db.ref('/')
      .once('value')
      .then(function(value) {
        console.log(value.val());
      });
  }
}

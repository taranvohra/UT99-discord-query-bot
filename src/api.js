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
          status += message.toString();
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

  static async getCopyOfDB() {
    const snapshot = await db.ref('/').once('value');
    return snapshot.val().Servers;
  }

  static async updateDB(snapshot) {
    try {
      await db.ref('/Servers').set(snapshot);
      const cache = await API.getCopyOfDB();
      return { status: true, cache, msg: 'Query server added' };
    } catch (e) {
      console.log('updateDB Error ', e);
      return { status: false, msg: 'Something went wrong' };
    }
  }
}

import dgram from 'dgram';
import db from './db';
import { checkIfFinalPacket, createSortedDBSnapshot } from './helpers';

export default class API {
  static getUT99ServerStatus(host, port) {
    return new Promise((resolve, reject) => {
      try {
        let status = '';
        const socket = dgram.createSocket('udp4');
        const datagram = '\\status\\';

        socket.send(datagram, port, host, err => {
          if (err) reject(err);
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
    const snapshot = await db
      .ref('/Servers')
      .orderByChild('timestamp')
      .once('value');
    return createSortedDBSnapshot(snapshot);
  }

  static async pushToDB(id, payload) {
    try {
      await db.ref(`/Servers/${id}`).set(payload);
      const cache = await API.getCopyOfDB();
      return { status: true, cache, msg: 'Query server added' };
    } catch (error) {
      console.log('pushToDB Error ', e);
      return { status: false, msg: 'Something went wrong' };
    }
  }

  static async deleteFromDB(id) {
    try {
      await db.ref(`/Servers/${id}`).remove();
      const cache = await API.getCopyOfDB();
      return { status: true, cache, msg: 'Query server removed' };
    } catch (error) {
      console.log('deleteFromDB Error ', e);
      return { status: false, msg: 'Something went wrong' };
    }
  }
}

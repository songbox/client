import PhoenixSocket from 'phoenix/services/phoenix-socket';
import Ember from 'ember';

import ENV from '../config/environment';

const {
  assert,
  inject: { service },
  RSVP
} = Ember;

export default PhoenixSocket.extend({
  session: service(),
  flashMessages: service(),

  init() {
    // You may listen to open, "close" and "error"
    this.on('open', () => {
      this.get('flashMessages').success('Socket was opened!');
    });
    this.on('close', () => {
      this.get('flashMessages').danger('Socket was closed!');
    });
    this.on('error', () => {
      this.get('flashMessages').danger('Socket could not be opened!');
    });
  },

  connectUser() {
    const token = this.get('session.data').authenticated.access_token;
    const params = { token };
    return this.connect(`${ENV.ws.host}/socket/user`, { params });
  },

  connectViewer() {
    return this.connect(`${ENV.ws.host}/socket/viewer`);
  },

  joinChannel(name, params) {
    const socket = this.get('socket');
    assert('must connect to a socket first', socket);

    return new RSVP.Promise((resolve, reject) => {
      const channel = socket.channel(name, params);
      channel.join()
        .receive('ok', () => {
          this.get('flashMessages').success('Room joined!');
          resolve(channel);
        })
        .receive('error', ({ reason }) => {
          this.get('flashMessages').danger('Room could not be joined!');
          reject(reason);
        })
        .receive('timeout', () => {
          this.get('flashMessages').info('Networking issue. Still waiting...');
        });
    });
  }

});

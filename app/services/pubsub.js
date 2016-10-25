import PhoenixSocket from 'phoenix/services/phoenix-socket';
import Ember from 'ember';

import ENV from '../config/environment';

const {
  inject: { service }
} = Ember;

export default PhoenixSocket.extend({
  session: service(),

  init() {
    // You may listen to open, "close" and "error"
    this.on('open', () => {
      console.log('Socket was opened!');
    });
    this.on('close', () => {
      console.log('Socket was closed!');
    });
    this.on('error', () => {
      console.log('Socket could not be opened!');
    });
  },

  connectUser() {
    const token = this.get('session.data').authenticated.access_token;
    const params = { token };
    return this.connect(`${ENV.ws.host}/socket/user`, { params });
  },

  connectViewer() {
    return this.connect(`${ENV.ws.host}/socket/viewer`);
  }

});

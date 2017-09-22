import { assert } from '@ember/debug';
import { equal } from '@ember/object/computed';
import RSVP from 'rsvp';
import Service, { inject as service } from '@ember/service';
import PhoenixSocket from 'phoenix/services/phoenix-socket';

import ENV from '../config/environment';

const PhoenixSocketService = PhoenixSocket.extend({
  session: service(),
  flashMessages: service(),

  statusCode: 0,
  statusMessage: '',

  isSuccess: equal('statusCode', 2),
  isInfo: equal('statusCode', 1),
  isDanger: equal('statusCode', 0),

  init() {
    // You may listen to open, "close" and "error"
    this.on('open', () => {
      this._success('Connection established!')
    });
    this.on('close', () => {
      this._danger('Connection lost!')
    });
    this.on('error', () => {
      this._danger('Error connecting!')
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
          this._success('Ready to broadcast!')
          resolve(channel);
        })
        .receive('error', ({ reason }) => {
          this._danger('Cannot broadcast!')
          reject(reason);
        })
        .receive('timeout', () => {
          this._info('Networking issue. Still waiting...');
        });
    });
  },

  // status changes
  _success(message) {
    this.get('flashMessages').success(message);
    this.setProperties({ statusCode: 2, statusMessage: message });
  },
  _info(message) {
    this.get('flashMessages').info(message);
    this.setProperties({ statusCode: 1, statusMessage: message });
  },
  _danger(message) {
    this.get('flashMessages').danger(message);
    this.setProperties({ statusCode: 0, statusMessage: message });
  }
});

// DummySocketService used while dev with `ember-cli-mirage` or while testing.
// (better to inject somewhere?)
const DummySocketService = Service.extend({
  connectUser() {
    return new RSVP.resolve({
    });
  },
  connectViewer() {
    return new RSVP.resolve({
    });
  },
  joinChannel(/*name, params*/) {
    return new RSVP.resolve({
      push() {
      },
      on() {
      }
    });
  }
});

let SocketService;
if (ENV['ember-cli-mirage'].enabled || ENV.environment === 'test') {
  SocketService = DummySocketService;
} else {
  SocketService = PhoenixSocketService;
}

export default SocketService;

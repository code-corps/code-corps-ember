import PhoenixSocket from 'phoenix/services/phoenix-socket';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'code-corps-ember/config/environment';

export default PhoenixSocket.extend({
  session: service(),

  init() {
    let session = get(this, 'session');
    session.on('authenticationSucceeded', () => this.toggleConnection());
    session.on('invalidationSucceeded', () => this.toggleConnection());
  },

  connect() {
    let socket = get(this, 'socket');
    let token = get(this, 'session.session.authenticated.token');
    let params = token ? { token } : {};

    // Only create a socket when:
    // - no socket exists
    // - we're exchanging an unauthenticated socket for an authenticated one
    if (!socket) {
      this._super(ENV.SOCKETS_BASE_URL, { params });
    } else if (socket && token) {
      this.disconnect(() => this._super(ENV.SOCKETS_BASE_URL, { params }));
    }
  },

  disconnect(callback) {
    let socket = get(this, 'socket');
    if (socket) {
      socket.disconnect(callback);
    } else {
      return callback && callback();
    }
  },

  joinChannel(channelName) {
    return this._super(channelName);
  },

  leaveChannel(channelName) {
    let socket = get(this, 'socket');
    let channel = socket.channel(channelName);
    return channel.leave();
  },

  toggleConnection() {
    this.disconnect(() => this.connect());
  }
});

import PhoenixSocket from 'phoenix/services/phoenix-socket';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'code-corps-ember/config/environment';

export default PhoenixSocket.extend({
  session: service(),
  store: service(),

  connect() {
    if (!get(this, 'socket')) { // Only create one socket at a time
      let token = get(this, 'session.session.authenticated.token');
      this._super(ENV.SOCKETS_BASE_URL, {
        params: { token }
      });
    }
  },

  async join(conversation) {
    await this.connect();
    let id = get(conversation, 'id');
    let channel = this.joinChannel(`conversation:${id}`);

    channel.on('new:conversation-part', () => this._onNewMessage(conversation));
  },

  leave(conversation) {
    let socket = get(this, 'socket');
    let id = get(conversation, 'id');
    let channel = socket.channel(`conversation:${id}`);
    channel.leave();
  },

  _onNewMessage(conversation) {
    let store = get(this, 'store');
    let id = get(conversation, 'id');
    store.findRecord('conversation', id);
  }
});

import { get } from '@ember/object';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  socket: service(),
  store: service(),

  async join(conversation) {
    let socket = get(this, 'socket');

    await socket.connect();

    let id = get(conversation, 'id');
    let channel = socket.joinChannel(`conversation:${id}`);

    channel.on('new:conversation-part', () => this._onNewMessage(conversation));
  },

  leave(conversation) {
    let id = get(conversation, 'id');
    return get(this, 'socket').leaveChannel(`conversation:${id}`);
  },

  _onNewMessage(conversation) {
    let store = get(this, 'store');
    let id = get(conversation, 'id');
    return store.findRecord('conversation', id);
  }
});

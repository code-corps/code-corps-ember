import { get } from '@ember/object';
import { alias } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  currentUser: service(),
  socket: service(),
  sounds: service(),
  store: service(),

  user: alias('currentUser.user'),

  async join(conversation) {
    let socket = get(this, 'socket');

    let id = get(conversation, 'id');
    let channel = socket.joinChannel(`conversation:${id}`);

    channel.on('new:conversation-part', (conversationPart) =>
      this._onNewPart(conversation, conversationPart));
  },

  leave(conversation) {
    let id = get(conversation, 'id');
    return get(this, 'socket').leaveChannel(`conversation:${id}`);
  },

  _onNewPart(conversation, conversationPart) {
    let store = get(this, 'store');
    let id = get(conversation, 'id');

    return store.findRecord('conversation', id).then((result) => {
      if (conversationPart.author_id != get(this, 'user.id')) {
        get(this, 'sounds').popup();
      }

      return result;
    });
  }
});

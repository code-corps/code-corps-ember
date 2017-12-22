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

    return channel;
  },

  leave(conversation) {
    let id = get(conversation, 'id');
    return get(this, 'socket').leaveChannel(`conversation:${id}`);
  }
});

import Controller from '@ember/controller';
import { get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),

  conversation: alias('model'),
  user: alias('currentUser.user'),

  send(body) {
    let conversation = get(this, 'conversation');
    let store = get(this, 'store');
    let user = get(this, 'user');

    let params = { author: user, body, conversation };
    return store.createRecord('conversation-part', params).save();
  }
});

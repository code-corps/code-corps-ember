import { Factory } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  status: 'open',

  updatedAt(i) {
    return moment().subtract(i, 'days');
  },

  // ensures creation of associated records if they were not otherwise specified
  afterCreate(conversation, server) {
    if (!conversation.user) {
      conversation.user  = server.create('user');
      conversation.save();
    }

    if (!conversation.message) {
      conversation.message = server.create('message');
      conversation.save();
    }
  }
});

import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({
  queryParams: ['status'],
  status: 'open',

  currentlyLoading: null,

  actions: {
    close(conversation) {
      set(conversation, 'status', 'closed');
      return conversation.save();
    },

    reopen(conversation) {
      set(conversation, 'status', 'open');
      return conversation.save();
    }
  }
});

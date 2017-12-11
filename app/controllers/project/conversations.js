import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({
  actions: {
    close(conversation) {
      set(conversation, 'status', 'closed');
      return conversation.save();
    }
  }
});

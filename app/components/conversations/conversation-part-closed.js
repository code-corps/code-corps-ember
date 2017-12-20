import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';

export default Component.extend({
  classNames: ['conversation-part-closed'],

  closedAt: null,

  currentUser: service(),

  isSelf: computed('author', 'user', function() {
    return get(this, 'author.id') === get(this, 'user.id');

    closedUser: computed ('isSelf', 'currentUser', function() {
      if 
    })
  })
  })
});

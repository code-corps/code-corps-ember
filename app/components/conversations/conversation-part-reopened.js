import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({

  author: null,

  classNames: ['conversation-part-reopened'],
  classNameBindings: ['isSelf:conversation-part-reopened--is-self'],

  reopenedAt: null,

  currentUser: service(),

  isSelf: computed('author', 'user', function() {
    return get(this, 'author.id') === get(this, 'user.id');
  }),

  user: alias('currentUser.user')
});

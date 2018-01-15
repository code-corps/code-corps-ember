import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({

  classNames: ['conversation-part', 'conversation-part--closed'],
  classNameBindings: ['isSelf:conversation-part--is-self'],

  currentUser: service(),

  author: null,

  closedAt: null,

  user: alias('currentUser.user'),

  isSelf: computed('author', 'user', function() {
    return get(this, 'author.id') === get(this, 'user.id');
  })
});

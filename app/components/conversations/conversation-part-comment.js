import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['conversation-part, conversation-part-comment'],
  classNameBindings: ['isSelf:conversation-part--is-self'],

  author: null,
  body: null,
  readAt: null,
  sentAt: null,

  currentUser: service(),

  user: alias('currentUser.user'),

  avatarTooltipSide: computed('isSelf', function() {
    return get(this, 'isSelf') ? 'right' : 'left';
  }),

  isSelf: computed('author', 'user', function() {
    return get(this, 'author.id') === get(this, 'user.id');
  })
});

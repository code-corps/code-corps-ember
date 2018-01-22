import Component from '@ember/component';
import { run } from '@ember/runloop';
import EmberCan from 'ember-can';
import { alias, filter } from '@ember/object/computed';
import { computed, get } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  classNames: ['conversation-thread'],

  conversation: null,
  sortedConversationParts: [],

  project: alias('conversation.project'),
  ability: EmberCan.computed.ability('project'),
  canAdminister: alias('ability.canAdminister'),

  conversationPartsAccessibleByUser: computed('sortedConversationParts', function() {
    let canAdminister = get(this, 'canAdminister');

    if (canAdminister) {
      return get(this, 'sortedConversationParts');
    } else {
      return get(this, 'sortedComments');
    }
  }),

  sortedComments: filter('sortedConversationParts', function(part) {
    let partType = get(part, 'partType');
    return (isEmpty(partType) || (partType === 'comment'));
  }),

  _setup: (function() {
    this.scrollBottomAfterRender();
  }).on('didInsertElement'),

  didUpdateAttrs() {
    this.scrollBottomAfterRender();
  },

  scrollBottom() {
    let [thread] = this.$();
    thread.scrollTop = thread.scrollHeight;
  },

  scrollBottomAfterRender() {
    run.scheduleOnce('afterRender', this, 'scrollBottom');
  }
});

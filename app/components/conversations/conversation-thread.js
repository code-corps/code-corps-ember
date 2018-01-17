import Component from '@ember/component';
import { run } from '@ember/runloop';
import EmberCan from 'ember-can';
import { alias, filter } from '@ember/object/computed';
import { get, getProperties } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  classNames: ['conversation-thread'],

  ability: EmberCan.computed.ability('project'),
  canAdminister: alias('ability.canAdminister'),

  conversationPartIsAccessibleByUser: filter('sortedConversationParts',
    function() {
      let { canAdminister } = getProperties(this, 'canAdminister');
      if (canAdminister) {
        return get(this, 'sortedConversationParts');
      } else {
        return get(this, 'sortedConversationParts').filter((part) => {
          let partType = get(part, 'conversationPart.partType');
          return (isEmpty(partType) || (partType === 'comment'));
        });
      }
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

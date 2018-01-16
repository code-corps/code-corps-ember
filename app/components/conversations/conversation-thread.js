import Component from '@ember/component';
import { run } from '@ember/runloop';
import EmberCan from 'ember-can';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['conversation-thread'],

  ability: EmberCan.computed.ability('project'),
  canAdminister: alias('ability.canAdminister'),

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

import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({
  classNames: ['conversation-thread'],

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

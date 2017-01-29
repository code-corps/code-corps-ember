import Ember from 'ember';
import { keyDown as keyDownEvent } from 'ember-keyboard';

const { on, TextArea, set } = Ember;

export default TextArea.extend({
  init() {
    this._super(...arguments);
    set(this, 'keyboardActivated', true);
  },

  customSubmit: on(keyDownEvent('cmd+Enter'), keyDownEvent('ctrl+Enter'), function(e) {
    e.preventDefault();
    this.sendAction('modifiedSubmit');
  })
});

import Ember from 'ember';
import { EKMixin, EKOnFocusMixin, keyDown } from 'ember-keyboard';

const { TextArea, on } = Ember;

export default TextArea.extend(EKMixin, EKOnFocusMixin, {
  init() {
    this._super(...arguments);
    this.set('keyboardActivated', true);
  },

  customSubmit: on(keyDown('Enter+cmd'), function(e) {
    e.preventDefault();
    this.sendAction('modifiedSubmit');
  })
});

import TextArea from '@ember/component/text-area';
import { on } from '@ember/object/evented';
import { EKMixin, EKOnFocusMixin, keyDown } from 'ember-keyboard';

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

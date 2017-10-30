import { on } from '@ember/object/evented';
import { set } from '@ember/object';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import {
  EKMixin as EmberKeyboardMixin,
  keyDown
} from 'ember-keyboard';

export default ModalDialog.extend(EmberKeyboardMixin, {
  init() {
    this._super(...arguments);

    set(this, 'keyboardActivated', true);
  },

  closeOnEsc: on(keyDown('Escape'), function() {
    this.sendAction('close');
  })
});

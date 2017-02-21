import {
  attribute, fillable, hasClass, triggerable, value
} from 'ember-cli-page-object';
import { triggerKeyDown } from 'ember-keyboard';

export default {
  scope: 'textarea',
  fillIn: fillable(),
  focus: triggerable('focus', ''),
  isFocused: hasClass('focused'),

  keySubmit() {
    this.focus();
    triggerKeyDown('Enter+cmd');
    return this;
  },

  placeholder: attribute('placeholder'),
  value: value()
};

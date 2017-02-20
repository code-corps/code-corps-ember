import Ember from 'ember';
import { getCode } from 'ember-keyboard';

const { get, set, TextField } = Ember;

export default TextField.extend({
  tagname: 'input',

  init() {
    this._super(...arguments);
    set(this, 'keyboardActivated', true);
  },

  keyDown(e) {
    let key = getCode(e);
    switch (key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Comma':
      case 'Enter':
        e.preventDefault();
        break;
      default:
        this._super(...arguments);
    }
    get(this, 'getKeyDown')(key);
  }
});

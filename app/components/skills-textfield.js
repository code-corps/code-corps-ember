import { set, get } from '@ember/object';
import TextField from '@ember/component/text-field';
import { getCode } from 'ember-keyboard';

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

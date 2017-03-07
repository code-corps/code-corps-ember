import {
  clickable,
  fillable,
  findElement,
  isVisible,
  value
} from 'ember-cli-page-object';

import fillInFileInput from '../../helpers/fill-in-file-input';
import removeDoubleQuotes from '../../helpers/remove-double-quotes';

export default {
  scope: '.organization-settings-form',

  description: {
    scope: 'input[name=description]',
    fillIn: fillable(),
    value: value()
  },

  imageDrop: {
    scope: '.image-drop',

    dropFile(content) {
      fillInFileInput(`${this.scope} input[type=file]`, { name: 'file.png', content });
    },

    backgroundImageData() {
      let $el = findElement(this);
      let backgroundImageData = $el.css('background-image');
      return removeDoubleQuotes(backgroundImageData);
    }
  },

  name: {
    scope: 'input[name=name]',
    fillIn: fillable(),
    value: value()
  },

  save: {
    scope: '.save',
    click: clickable(),
    isVisible: isVisible()
  }
};

import {
  clickable,
  fillable,
  findElement
} from 'ember-cli-page-object';

import fillInFileInput from '../../helpers/fill-in-file-input';
import removeDoubleQuotes from '../../helpers/remove-double-quotes';

export default {
  scope: '.user-settings-form',

  firstName: fillable('input[name=firstName]'),
  lastName: fillable('input[name=lastName]'),
  twitter: fillable('input[name=twitter]'),
  website: fillable('input[name=website]'),
  biography: fillable('input[name=biography]'),

  clickSave: clickable('.save'),

  imageDrop: {
    scope: '.image-drop',

    dropFile(content) {
      fillInFileInput(`${this.scope} input`, { name: 'file.png', content });
    },

    backgroundImageData() {
      let $el = findElement(this);
      let backgroundImageData = $el.css('background-image');
      return removeDoubleQuotes(backgroundImageData);
    }
  }
};

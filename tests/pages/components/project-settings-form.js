import {
  clickable,
  fillable,
  findElement
} from 'ember-cli-page-object';

import fillInFileInput from '../../helpers/fill-in-file-input';
import removeDoubleQuotes from '../../helpers/remove-double-quotes';

export default {
  scope: '.project-settings-form',

  description: fillable('input[name=description]'),
  title: fillable('input[name=title]'),

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

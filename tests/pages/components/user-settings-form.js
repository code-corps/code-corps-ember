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
  scope: '.user-settings-form',

  biography: fillable('input[name=biography]'),
  firstName: fillable('input[name=firstName]'),
  lastName: fillable('input[name=lastName]'),
  twitter: fillable('input[name=twitter]'),
  website: fillable('input[name=website]'),

  biographyValue: value('input[name=biography]'),
  firstNameValue: value('input[name=firstName]'),
  lastNameValue: value('input[name=lastName]'),
  twitterValue: value('input[name=twitter]'),
  websiteValue: value('input[name=website]'),

  saveVisible: isVisible('.save'),

  clickSave: clickable('.save'),

  imageDrop: {
    scope: '.image-drop',

    backgroundImageData() {
      let $el = findElement(this);
      let backgroundImageData = $el.css('background-image');
      return removeDoubleQuotes(backgroundImageData);
    },

    dropFile(content) {
      fillInFileInput(`${this.scope} input[type=file]`, { name: 'file.png', content });
    }
  }
};

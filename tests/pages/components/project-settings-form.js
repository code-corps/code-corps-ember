import {
  clickable,
  fillable,
  isVisible,
  value
} from 'ember-cli-page-object';

import imageDrop from 'code-corps-ember/tests/pages/components/image-drop';

export default {
  scope: '.project-settings-form',

  description: {
    scope: 'input[name=description]',
    fillIn: fillable(),
    value: value()
  },

  imageDrop,

  save: {
    scope: '.save',
    click: clickable(),
    isVisible: isVisible()
  },

  title: {
    scope: 'input[name=title]',
    fillIn: fillable(),
    value: value()
  },

  website: {
    scope: 'input[name=website]',
    fillIn: fillable(),
    value: value()
  }
};

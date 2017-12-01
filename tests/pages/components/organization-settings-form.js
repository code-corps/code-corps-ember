import {
  clickable,
  fillable,
  isVisible,
  value
} from 'ember-cli-page-object';

import imageDrop from 'code-corps-ember/tests/pages/components/image-drop';

export default {
  scope: '.organization-settings-form',

  description: {
    scope: 'input[name=description]',
    fillIn: fillable(),
    value: value()
  },

  imageDrop,

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

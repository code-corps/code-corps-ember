import {
  clickable,
  fillable,
  isVisible,
  value
} from 'ember-cli-page-object';

import imageDrop from 'code-corps-ember/tests/pages/components/image-drop';

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

  imageDrop
};

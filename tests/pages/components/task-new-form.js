import {
  attribute
} from 'ember-cli-page-object';

export default {
  markdown: {
    scope: '[name=markdown]',
    placeholder: attribute('placeholder')
  },

  saveButton: {
    scope: 'input[name=submit]'
  },

  title: {
    scope: '[name=title]'
  }
};

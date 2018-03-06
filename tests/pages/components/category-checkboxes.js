import {
  collection,
  property,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.category-checkboxes',

  checkboxes: collection('li', {
    isChecked: property('checked', 'input'),
    label: { scope: 'label', name: text() }
  })
};

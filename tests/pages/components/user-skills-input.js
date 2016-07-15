import {
  fillable,
  triggerable,
  text,
  clickable,
  collection
} from 'ember-cli-page-object';

export default {
  scope: '.user-skills-input',

  fillIn: fillable('input'),
  focus: triggerable('focus', 'input'),

  dropdown: collection({
    scope: '.dropdown-menu',
    itemScope: 'li',

    item: {
      text: text(),
      click: clickable()
    }
  })
};

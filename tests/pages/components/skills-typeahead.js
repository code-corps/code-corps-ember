import {
  collection, fillable, isVisible, isHidden, triggerable, value
} from 'ember-cli-page-object';
import skillsTypeaheadResult from './skills-typeahead-result';

export default {
  scope: '.skills-typeahead',

  fillIn: fillable('input'),
  focus: triggerable('focus', 'input'),
  inputValue: value('input'),
  dropdownMenuVisible: isVisible('.dropdown-menu'),
  dropdownMenuHidden: isHidden('.dropdown-menu'),

  mousedownDropdownSecondItem: triggerable('mousedown', '.dropdown-menu li:eq(1)'),
  mouseenterDropdownSecondItem: triggerable('mouseenter', '.dropdown-menu li:eq(1)'),

  keydown: triggerable('keydown', 'input'),

  pressCommaKey: triggerable('keydown', 'input', {
    eventProperties: {
      keyCode : 188,
      which   : 188
    }
  }),

  pressDownKey: triggerable('keydown', 'input', {
    eventProperties: {
      keyCode : 40,
      which   : 40
    }
  }),

  pressEnterKey: triggerable('keydown', 'input', {
    eventProperties: {
      keyCode : 13,
      which   : 13
    }
  }),

  pressEscKey: triggerable('keydown', 'input', {
    eventProperties: {
      keyCode : 27,
      which   : 27
    }
  }),

  pressRKey: triggerable('keydown', 'input', {
    eventProperties: {
      keyCode : 82,
      which   : 82
    }
  }),

  pressUpKey: triggerable('keydown', 'input', {
    eventProperties: {
      keyCode : 38,
      which   : 38
    }
  }),

  inputItems: collection({
    item: skillsTypeaheadResult,
    itemScope: skillsTypeaheadResult.scope
  })
};

import {
  collection, fillable, triggerable, value
} from 'ember-cli-page-object';
import skillsTypeaheadResult from './skills-typeahead-result';

export default {
  scope: '.skills-typeahead',

  /**
   * Types into the skills typeahead search box and triggers focus immediately
   * after, so that results are shown once promises resolve.
   *
   * This is the most reliable way to simulate using the typeahead
   * control.
   */
  searchFor(text) {
    this.fillIn(text).focus();
  },

  fillIn: fillable('input'),
  focus: triggerable('focus', 'input'),
  inputValue: value('input'),

  dropdown: {
    testContainer: '.ember-tether',
    scope: '.dropdown-menu',
    resetScope: true,

    inputItems: collection({
      item: skillsTypeaheadResult,
      itemScope: skillsTypeaheadResult.scope
    }),

    mousedownSecondItem: triggerable('mousedown', 'li:eq(1)'),
    mouseenterSecondItem: triggerable('mouseenter', 'li:eq(1)')
  },

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
  })
};

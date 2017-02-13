import { clickable, collection, fillable, triggerable } from 'ember-cli-page-object';
import usersListItem from './users-list-item';

export default {
  scope: '.task__user__users-list',

  filter: {
    scope: '.select-dropdown__filter',
    input: fillable('input'),

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
  },

  header: {
    scope: '.select-dropdown__header',
    clickClose: clickable('select-dropdown__header__close')
  },

  results: {
    scope: '.select-dropdown__results',
    list: collection({
      item: usersListItem
    })
  }
};

import {
  attribute
} from 'ember-cli-page-object';
import select from 'code-corps-ember/tests/pages/components/power-select';
import { triggerKeyDown } from 'ember-keyboard';

export default {
  scope: '.task-assignment',

  assignedUser: {
    scope: '.select-inline__selected-item',
    icon: {
      scope: 'img',
      url: attribute('src')
    }
  },

  select,

  triggerKeyDown,

  unselectedItem: {
    scope: '.select-inline__unselected-item'
  }
};

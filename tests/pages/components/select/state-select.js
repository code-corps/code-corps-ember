import {
  selectable
} from 'ember-cli-page-object';

export default {
  scope: '.select-state',

  state: {
    scope: 'select:eq(0)',
    fillIn: selectable()
  }
};

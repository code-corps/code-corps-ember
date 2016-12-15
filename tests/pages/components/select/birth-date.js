import {
  selectable
} from 'ember-cli-page-object';

export default {
  scope: '.select-birth-date',

  month: {
    scope: 'select:eq(0)',
    fillIn: selectable()
  },
  day: {
    scope: 'select:eq(1)',
    fillIn: selectable()
  },
  year: {
    scope: 'select:eq(2)',
    fillIn: selectable()
  }
};

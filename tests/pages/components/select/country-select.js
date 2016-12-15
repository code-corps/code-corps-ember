import {
  selectable
} from 'ember-cli-page-object';

export default {
  scope: '.select-country',

  country: {
    scope: 'select:eq(0)',
    fillIn: selectable()
  }
};

import Component from '@ember/component';
import { computed, set } from '@ember/object';
import moment from 'moment';
import { range } from 'code-corps-ember/utils/array-utils';

export default Component.extend({
  classNames: ['select-cc-expiry'],

  monthOptions: computed(function() {
    return moment.months().map(this._formatMonth);
  }),

  yearOptions: computed(function() {
    let thisYear = moment().year();
    return range(thisYear, thisYear + 20);
  }),

  update(property, value) {
    set(this, property, value);
  },

  _formatMonth(name, index) {
    return { text: name, number: index + 1 };
  }
});

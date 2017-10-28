import Component from '@ember/component';
import { set, getProperties, get, computed } from '@ember/object';
import moment from 'moment';
import { range } from 'code-corps-ember/utils/array-utils';

export default Component.extend({
  classNames: ['select-birth-date'],

  selectedMoment: computed('month', 'year', function() {
    let { month, year } = getProperties(this, 'month', 'year');
    return moment(`${year}-${month}`, 'Y-M');
  }),

  monthOptions: computed(function() {
    return moment.months().map(this._formatMonth);
  }),

  dayOptions: computed('selectedMoment', function() {
    let selectedMoment = get(this, 'selectedMoment');
    let maxDay = selectedMoment.daysInMonth();

    return range(1, maxDay);
  }),

  yearOptions: computed(function() {
    let thisYear = moment().year();
    return range(thisYear - 120, thisYear).reverse();
  }),

  update(property, value) {
    set(this, property, value);

    if (property === 'month') {
      this._constrainDay();
    }

    if (property === 'year') {
      this._constrainDay();
      this._constrainMonth();
    }
  },

  _constrainDay() {
    let day = get(this, 'day');
    let days = get(this, 'dayOptions');
    let maxDay = days[days.length - 1];
    if (day > maxDay) {
      set(this, 'day', maxDay);
    }
  },

  _constrainMonth() {
    let month = get(this, 'month');
    let months = get(this, 'monthOptions');
    let maxMonth = months[months.length - 1];
    if (month > maxMonth.number) {
      set(this, 'month', maxMonth.number);
    }
  },

  _formatMonth(name, index) {
    return { text: name, number: index + 1 };
  }
});

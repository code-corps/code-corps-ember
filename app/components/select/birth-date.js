import Ember from 'ember';
import moment from 'moment';

const {
  Component
 } = Ember;

export default Component.extend({
  classNames: ['select-birth-date'],

  monthOptions: function() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((i) => {
      return {
        number: i,
        text: moment.months(i - 1)
      };
    });
  }.property(),

  dayOptions: function() {
    let results = [];
    for (let i = 1; i <= 31; i++) {
      results.push(i);
    }
    return results;
  }.property(),

  yearOptions: function() {
    let thisYear = moment().year();
    let results = [];
    return (function() {
      for (let i = thisYear, ref = thisYear - 120; thisYear <= ref ? i <= ref : i >= ref; thisYear <= ref ? i++ : i--) {
        results.push(i);
      }
      return results;
    }).apply(this);
  }.property()
});

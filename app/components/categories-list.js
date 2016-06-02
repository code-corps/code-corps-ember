import Ember from 'ember';

export default Ember.Component.extend({
  sortByName: ['name'],
  sortedCategories: Ember.computed.sort('categories', 'sortByName'),
});

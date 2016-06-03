import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['categories-list'],
  sortByName: ['name'],
  sortedCategories: Ember.computed.sort('categories', 'sortByName'),
});

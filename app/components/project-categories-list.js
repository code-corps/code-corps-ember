import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['categories'],

  sortByName: ['name'],
  sortedCategories: Ember.computed.sort('categories', 'sortByName'),
});

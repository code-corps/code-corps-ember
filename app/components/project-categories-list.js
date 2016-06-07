import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['categories'],
  sortByName: ['name'],
  tagName: 'ul',

  sortedCategories: Ember.computed.sort('categories', 'sortByName'),
});

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: ['li'],

  userCategories: Ember.inject.service(),

  selected: Ember.computed('category', 'userCategories.usersUserCategories', function() {
    let category = this.get('category');
    let userCategories = this.get('userCategories');
    return userCategories.hasCategory(category);
  }),
});

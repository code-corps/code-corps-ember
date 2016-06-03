import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['category-item'],
  classNameBindings: ['selected'],

  currentUser: Ember.inject.service(),
  userCategories: Ember.inject.service(),

  user: Ember.computed.alias('currentUser.user'),
  usersCategories: Ember.computed.alias('user.categories'),

  selected: Ember.computed('category', 'usersCategories', function() {
    let category = this.get('category');
    let userCategories = this.get('userCategories');
    return userCategories.hasCategory(category);
  }),
});

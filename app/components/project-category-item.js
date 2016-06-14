import Ember from 'ember';

export default Ember.Component.extend({
  tagName: ['li'],

  selected: Ember.computed.notEmpty('userCategory'),
  userCategories: Ember.inject.service(),
  user: Ember.computed.alias('currentUser.user'),
  usersUserCategories: Ember.computed.alias('user.userCategories'),

  userCategory: Ember.computed('category', 'userCategories.userCategories.isFulfilled', function() {
    let category = this.get('category');
    let userCategories = this.get('userCategories');
    return userCategories.findUserCategory(category);
  }),
});

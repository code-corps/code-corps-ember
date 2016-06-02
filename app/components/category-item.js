import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['category-item'],
  classNameBindings: ['selected'],

  session: Ember.inject.service(),
  userCategories: Ember.inject.service(),

  currentUser: Ember.computed.alias('session.currentUser'),

  selected: Ember.computed('category', 'userCategories.usersUserCategories', function() {
    let category = this.get('category');
    let userCategories = this.get('userCategories');
    return userCategories.hasCategory(category);
  }),
});

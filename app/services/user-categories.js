import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  currentUser: Ember.computed.alias('session.currentUser'),

  usersCategories: Ember.computed.alias('currentUser.categories'),

  usersUserCategories: Ember.computed.alias('currentUser.userCategories'),

  categories: Ember.computed('usersCategories.isLoaded', 'usersUserCategories.isLoaded', 'currentUser', function() {
    return this.get('usersCategories');
  }),

  updated: Ember.computed('usersCategories.isLoaded', 'usersUserCategories.isLoaded', 'currentUser', function() {
    return true;
  }),

  hasCategory: function(category) {
    let categories = this.get('categories');
    if(categories) {
      return categories.contains(category);
    }
  },

  findUserCategory: function(category) {
    let userCategories = this.get('usersUserCategories');
    let userCategory = userCategories.find(function(item) {
      let itemUserId = item.belongsTo('user').id();
      let itemCategoryId = item.belongsTo('category').id();
      let currentUserId = this.get('currentUser.id');
      let categoryId = category.get('id');
      return (itemUserId === currentUserId) && (itemCategoryId === categoryId);
    }.bind(this));
    return userCategory;
  },
});

import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: Ember.inject.service(),

  user: Ember.computed.alias('currentUser.user'),

  usersCategories: Ember.computed.alias('user.categories'),

  usersUserCategories: Ember.computed.alias('user.userCategories'),

  categories: Ember.computed('usersCategories.[]', 'usersUserCategories.[]', 'user', function() {
    return this.get('usersCategories');
  }),

  isEmpty: Ember.computed.empty('categories'),

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
      let userId = this.get('user.id');
      let categoryId = category.get('id');
      return (itemUserId === userId) && (itemCategoryId === categoryId);
    }.bind(this));
    return userCategory;
  },
});

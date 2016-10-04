import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: Ember.inject.service(),
  store: Ember.inject.service(),

  isEmpty: Ember.computed.empty('userCategories'),
  user: Ember.computed.alias('currentUser.user'),

  userCategories: Ember.computed('user.userCategories',
    'user.userCategories.@each.category',
    'user.userCategories.@each.user',
  function() {
    return this.get('user.userCategories');
  }),

  addCategory(category) {
    let user = this.get('user');
    let userCategory = this.get('store').createRecord('user-category', {
      user,
      category
    });
    return userCategory.save();
  },

  findUserCategory: function(category) {
    let userCategories = this.get('userCategories');
    if (userCategories) {
      let userCategory = userCategories.find((item) => {
        let itemUserId = item.belongsTo('user').id();
        let itemCategoryId = item.belongsTo('category').id();
        let userId = this.get('user.id');
        let categoryId = category.get('id');
        return (itemUserId === userId) && (itemCategoryId === categoryId);
      });
      return userCategory;
    }
  },

  removeCategory(category) {
    let userCategory = this.findUserCategory(category);
    return userCategory.destroyRecord();
  },
});

import Ember from 'ember';

const {
  computed,
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  store: service(),

  isEmpty: computed.empty('userCategories'),
  user: computed.alias('currentUser.user'),

  userCategories: computed('user.userCategories',
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

  findUserCategory(category) {
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
  }
});

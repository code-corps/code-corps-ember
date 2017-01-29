import Ember from 'ember';

const {
  computed,
  get,
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
    return get(this, 'user.userCategories');
  }),

  addCategory(category) {
    let user = get(this, 'user');
    let userCategory = get(this, 'store').createRecord('user-category', {
      user,
      category
    });
    return userCategory.save();
  },

  findUserCategory(category) {
    let userCategories = get(this, 'userCategories');
    if (userCategories) {
      let userCategory = userCategories.find((item) => {
        let itemUserId = item.belongsTo('user').id();
        let itemCategoryId = item.belongsTo('category').id();
        let userId = get(this, 'user.id');
        let categoryId = get(category, 'id');
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

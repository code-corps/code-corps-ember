import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  userCategories: Ember.inject.service(),

  currentUser: Ember.computed.alias('session.currentUser'),

  actions: {
    addCategory(category) {
      let currentUser = this.get('currentUser');
      let userCategory = this.get('store').createRecord('user-category', {
        user: currentUser,
        category: category
      });
      return userCategory.save();
    },
    removeCategory(category) {
      let userCategories = this.get('userCategories');
      let userCategory = userCategories.findUserCategory(category);
      return userCategory.destroyRecord().then(() => {
        this.get('currentUser.categories').removeObject(category);
      });
    },
  }
});

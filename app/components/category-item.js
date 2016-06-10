import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['category-item'],
  classNameBindings: ['selected'],
  isLoading: false,

  flashMessages: Ember.inject.service(),
  userCategories: Ember.inject.service(),

  selected: Ember.computed.notEmpty('userCategory'),

  userCategory: Ember.computed('category', 'userCategories.userCategories', function() {
    let category = this.get('category');
    let userCategories = this.get('userCategories');
    return userCategories.findUserCategory(category);
  }),

  actions: {
    addCategory(category) {
      this.set('isLoading', true);
      let userCategories = this.get('userCategories');
      return userCategories.addCategory(category).catch(() => {
        let message = `An error occurred trying to add ${category.get('name')}.`;
        this._flashError(message);
      }).finally(() => {
        this.set('isLoading', false);
      });
    },

    removeCategory(category) {
      this.set('isLoading', true);
      let userCategories = this.get('userCategories');
      return userCategories.removeCategory(category).catch(() => {
        let message = `An error occurred trying to remove ${category.get('name')}.`;
        this._flashError(message);
      }).finally(() => {
        this.set('isLoading', false);
      });
    },
  },

  _flashError(message) {
    const flashMessages = Ember.get(this, 'flashMessages');
    flashMessages.clearMessages();
    return flashMessages.add({
      message: message,
      type: 'danger',
      fixed: true,
      sticky: false,
      timeout: 5000,
    });
  },
});

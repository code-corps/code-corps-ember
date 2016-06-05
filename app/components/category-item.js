import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['category-item'],
  classNameBindings: ['selected'],

  isLoading: false,

  currentUser: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  userCategories: Ember.inject.service(),

  user: Ember.computed.alias('currentUser.user'),
  usersCategories: Ember.computed.alias('user.categories'),

  selected: Ember.computed('category', 'usersCategories', function() {
    let category = this.get('category');
    let userCategories = this.get('userCategories');
    return userCategories.hasCategory(category);
  }),

  actions: {
    addCategory(category) {
      this.set('isLoading', true);
      this.addCategory(category).catch(() => {
        let message = `An error occurred trying to add ${category.get('name')}.`;
        this._flashError(message);
      }).finally(() => {
        this.set('isLoading', false);
      });
    },
    removeCategory(category) {
      this.set('isLoading', true);
      this.removeCategory(category).catch(() => {
        let message = `An error occurred trying to remove ${category.get('name')}.`;
        this._flashError(message);
      }).finally(() => {
        this.set('isLoading', false);
      });
    },
  },

  _flashError(message) {
    const flashMessages = this.get('flashMessages');
    flashMessages.clearMessages();
    flashMessages.add({
      message: message,
      type: 'danger',
      fixed: true,
      sticky: false,
      timeout: 5000,
    });
  },
});

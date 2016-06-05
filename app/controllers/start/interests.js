import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

export default Ember.Controller.extend(OnboardingControllerMixin, {
  userCategories: Ember.inject.service(),

  user: Ember.computed.alias('currentUser.user'),

  actions: {
    addCategory(category) {
      let user = this.get('user');
      let userCategory = this.get('store').createRecord('user-category', {
        user: user,
        category: category
      });
      return userCategory.save().then(()=> {
        this.get('user.categories').pushObject(category);
      });
    },
    removeCategory(category) {
      let userCategories = this.get('userCategories');
      let userCategory = userCategories.findUserCategory(category);
      return userCategory.destroyRecord().then(() => {
        this.get('user.categories').removeObject(category);
      });
    },
  }
});

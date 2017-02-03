import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

const {
  computed: { alias },
  Controller,
  getProperties,
  inject: { service }
} = Ember;

export default Controller.extend(OnboardingControllerMixin, {
  currentUser: service(),
  store: service(),

  user: alias('model'),
  userSkills: alias('user.userSkills'),

  addSkill(skill) {
    console.log('adding skill');
    let { store, user } = getProperties(this, 'store', 'user');

    return store.createRecord('user-skill', { user, skill }).save();
  },

  removeUserSkill(userSkill) {
    userSkill.destroyRecord();
  }

});

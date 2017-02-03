import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

const {
  computed: { alias },
  Controller,
  get,
  inject: { service }
} = Ember;

export default Controller.extend(OnboardingControllerMixin, {
  currentUser: service(),
  store: service(),
  userSkillsList: service(),

  user: alias('model'),
  userSkills: alias('user.userSkills'),

  addSkill(skill) {
    return get(this, 'userSkillsList').add(skill);
  },

  removeSkill(skill) {
    return get(this, 'userSkillsList').remove(skill);
  },

  removeUserSkill(userSkill) {
    return userSkill.destroyRecord();
  },

  selectSkill(skill) {
    return get(this, 'userSkillsList').toggle(skill);
  }
});

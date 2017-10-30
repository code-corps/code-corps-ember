import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

export default Controller.extend(OnboardingControllerMixin, {
  currentUser: service(),
  store: service(),
  userSkillsList: service(),

  user: alias('model'),
  userSkills: alias('user.userSkills'),

  removeUserSkill(userSkill) {
    return userSkill.destroyRecord();
  },

  selectSkill(skill) {
    return get(this, 'userSkillsList').toggle(skill);
  }
});

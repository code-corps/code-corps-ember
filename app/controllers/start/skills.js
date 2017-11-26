import { alias, mapBy } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed, get, getProperties } from '@ember/object';
import { inject as service } from '@ember/service';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

export default Controller.extend(OnboardingControllerMixin, {
  currentUser: service(),
  store: service(),
  userSkillsList: service(),

  skills: mapBy('userSkills', 'skill'),
  userSkills: alias('user.userSkills'),

  removeUserSkill(userSkill) {
    return userSkill.destroyRecord();
  },

  selectSkill(skill) {
    return get(this, 'userSkillsList').toggle(skill);
  },

  selectablePopularSkills: computed('popularSkills.@each', 'skills.@each', function() {
    let { popularSkills, skills } = getProperties(this, 'popularSkills', 'skills');
    return popularSkills.filter((skill) => {
      return !skills || !skills.isAny('id', get(skill, 'id'));
    });
  })
});

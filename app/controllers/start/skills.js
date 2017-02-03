import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';
import skillsList from 'code-corps-ember/utils/skills-list';

const {
  computed: { alias },
  Controller,
  getProperties,
  inject: { service },
  isEmpty
} = Ember;

export default Controller.extend(OnboardingControllerMixin, {
  currentUser: service(),
  store: service(),

  user: alias('model'),
  userSkills: alias('user.userSkills'),

  addSkill(skill) {
    let { store, user } = getProperties(this, 'store', 'user');
    return store.createRecord('user-skill', { user, skill }).save();
  },

  removeSkill(skill) {
    let { userSkills, user } = getProperties(this, 'userSkills', 'user');
    let userSkill = skillsList.find(userSkills, skill, user);
    return userSkill.destroyRecord();
  },

  removeUserSkill(userSkill) {
    userSkill.destroyRecord();
  },

  selectSkill(skill) {
    let { userSkills, user } = getProperties(this, 'userSkills', 'user');
    let foundSkill = skillsList.find(userSkills, skill, user);

    if (isEmpty(foundSkill)) {
      this.addSkill(skill);
    } else {
      this.removeSkill(skill);
    }
  }
});

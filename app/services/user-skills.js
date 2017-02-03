import Ember from 'ember';
import skillsList from 'code-corps-ember/utils/skills-list';

const {
  computed,
  computed: {
    alias, empty
  },
  get,
  inject: { service },
  isEmpty,
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  store: service(),

  isEmpty: empty('userSkills'),
  user: alias('currentUser.user'),
  userSkills: alias('user.userSkills'),

  addSkill(skill) {
    console.log('add skill');
    let user = get(this, 'user');
    let userSkill = get(this, 'store').createRecord('user-skill', {
      user,
      skill
    });
    return userSkill.save();
  },

  hasSkill(skill) {
    let userSkills = get(this, 'userSkills');
    return skillsList.contains(userSkills, skill);
  },

  findUserSkill(skill) {
    let userSkills = get(this, 'userSkills');
    let user = get(this, 'user');
    return skillsList.find(userSkills, skill, user);
  },

  removeSkill(skill) {
    let userSkill = this.findUserSkill(skill);
    return userSkill.destroyRecord();
  }
});

import Ember from 'ember';

const {
  computed: { alias },
  Controller,
  get,
  inject: { service }
} = Ember;

export default Controller.extend({
  userSkillsList: service(),

  user: alias('model'),
  userSkills: alias('user.userSkills'),

  removeUserSkill(userSkill) {
    return userSkill.destroyRecord();
  },

  toggleSkill(skill) {
    let list = get(this, 'userSkillsList');
    return list.toggle(skill);
  }
});

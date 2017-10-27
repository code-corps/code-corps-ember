import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

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

import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  projectSkillsList: service(),

  project: alias('model'),
  projectSkills: alias('project.projectSkills'),

  removeProjectSkill(projectSkill) {
    return projectSkill.destroyRecord();
  },

  toggleSkill(skill) {
    let list = get(this, 'projectSkillsList');
    return list.toggle(skill);
  }
});

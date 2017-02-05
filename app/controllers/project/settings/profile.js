import Ember from 'ember';

const {
  computed: { alias },
  Controller,
  get,
  inject: { service }
} = Ember;

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

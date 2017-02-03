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

  toggleSkill(skill) {
    let list = get(this, 'projectSkillsList');
    list.setProject(get(this, 'project'));
    return list.toggle(skill);
  }
});

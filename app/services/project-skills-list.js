import Ember from 'ember';
import skillsList from 'code-corps-ember/utils/skills-list';

const {
  computed: {
    alias, empty
  },
  get,
  getProperties,
  inject: { service },
  isEmpty,
  Service,
  set
} = Ember;

export default Service.extend({
  store: service(),

  projectSkills: alias('project.projectSkills'),

  add(skill) {
    let { store, project } = getProperties(this, 'store', 'project');
    return store.createRecord('project-skill', { project, skill }).save();
  },

  contains(skill) {
    let projectSkills = get(this, 'projectSkills');
    return skillsList.contains(projectSkills, skill);
  },

  find(skill) {
    let projectSkills = get(this, 'projectSkills');
    let project = get(this, 'project');
    return skillsList.find(projectSkills, skill, project);
  },

  remove(skill) {
    let { projectSkills, project } = getProperties(this, 'projectSkills', 'project');
    let projectSkill = skillsList.find(projectSkills, skill, project);
    return projectSkill.destroyRecord();
  },

  toggle(skill) {
    let { projectSkills, project } = getProperties(this, 'projectSkills', 'project');
    let foundSkill = skillsList.find(projectSkills, skill, project);

    if (isEmpty(foundSkill)) {
      this.add(skill);
    } else {
      this.remove(skill);
    }
  },

  setProject(project) {
    set(this, 'project', project);
  }
});

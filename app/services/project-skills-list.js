import Ember from 'ember';
import recordsList from 'code-corps-ember/utils/records-list';

const {
  computed: {
    alias
  },
  get,
  getProperties,
  inject: { service },
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
    return recordsList.contains(projectSkills, skill);
  },

  find(skill) {
    let { projectSkills, project } = getProperties(this, 'projectSkills', 'project');
    return recordsList.find(projectSkills, skill, project);
  },

  remove(skill) {
    let projectSkill = this.find(skill);
    return projectSkill.destroyRecord();
  },

  setProject(project) {
    set(this, 'project', project);
    return this._refresh();
  },

  toggle(skill) {
    let projectSkills = get(this, 'projectSkills');
    if (recordsList.contains(projectSkills, skill)) {
      return this.remove(skill);
    } else {
      return this.add(skill);
    }
  },

  _refresh() {
    return get(this, 'projectSkills').reload();
  }
});

import { alias } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import { set, getProperties, get } from '@ember/object';
import recordsList from 'code-corps-ember/utils/records-list';

export default Service.extend({
  store: service(),

  project: null, // set typically in afterModel

  projectSkills: alias('project.projectSkills'),

  add(skill) {
    let { store, project } = getProperties(this, 'store', 'project');
    return store.createRecord('project-skill', { project, skill }).save();
  },

  addWithoutSave(skill) {
    let { store, project } = getProperties(this, 'store', 'project');
    let projectSkill = store.createRecord('project-skill', { project, skill });
    project.get('skills').pushObject(skill);
    return projectSkill;
  },

  includes(skill) {
    let projectSkills = get(this, 'projectSkills');
    return recordsList.includes(projectSkills, skill);
  },

  find(skill) {
    let { projectSkills, project } = getProperties(this, 'projectSkills', 'project');
    return recordsList.find(projectSkills, skill, project);
  },

  remove(skill) {
    let projectSkill = this.find(skill);
    let project = get(this, 'project');
    project.get('skills').popObject(skill);
    return projectSkill.destroyRecord();
  },

  setProject(project) {
    set(this, 'project', project);
    return this._refresh();
  },

  toggle(skill) {
    this._toggle(skill, this.add);
  },

  toggleWithoutSave(skill) {
    this._toggle(skill, this.addWithoutSave);
  },

  _refresh() {
    return get(this, 'projectSkills').reload();
  },

  _toggle(skill, add) {
    let projectSkills = get(this, 'projectSkills');
    if (recordsList.includes(projectSkills, skill)) {
      return this.remove(skill);
    } else {
      return add.call(this, skill);
    }
  }
});

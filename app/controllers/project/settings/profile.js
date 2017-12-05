import Controller from '@ember/controller';
import { get, getProperties } from '@ember/object';
import { inject as service } from '@ember/service';
import recordsList from 'code-corps-ember/utils/records-list';

export default Controller.extend({
  projectSkillsList: service(),
  store: service(),

  project: null,

  addCategory(category) {
    let { project, store } = getProperties(this, 'project', 'store');
    store.createRecord('project-category', { project, category }).save();
  },

  removeCategory(category) {
    let { project, projectCategories }
      = getProperties(this, 'project', 'projectCategories');

    let projectCategory = recordsList.find(projectCategories, category, project);
    projectCategory.destroyRecord();
  },

  removeProjectSkill(projectSkill) {
    return projectSkill.destroyRecord();
  },

  toggleSkill(skill) {
    let list = get(this, 'projectSkillsList');
    return list.toggle(skill);
  },

  updateCategories(newSelection, value, operation) {
    if (operation === 'added') {
      this.addCategory(value);
    }

    if (operation === 'removed') {
      this.removeCategory(value);
    }
  }
});

import Controller from '@ember/controller';
import { get, getProperties } from '@ember/object';
import { alias, mapBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import recordsList from 'code-corps-ember/utils/records-list';

export default Controller.extend({
  projectSkillsList: service(),
  store: service(),

  project: alias('model'),
  projectSkills: alias('project.projectSkills'),
  selectedCategories: alias('project.categories'),

  addCategories(categories) {
    let { project, store } = getProperties(this, 'project', 'store');
    categories.forEach((category) => {
      store.createRecord('project-category', { project, category }).save().then(() => project.reload());
    });
  },

  removeCategories(categories) {
    let { project, projectCategories, store } =
      getProperties(this, 'project', 'projectCategories', 'store');

    categories.forEach((category) => {
      let projectCategory = recordsList.find(projectCategories, category, project);
      projectCategory.destroyRecord().then(() => project.reload());
    });
  },

  removeProjectSkill(projectSkill) {
    return projectSkill.destroyRecord();
  },

  selectCategories(categories) {
    let selectedCategories = get(this, 'selectedCategories');

    let addedItems = categories.filter((item) => {
      return !selectedCategories.includes(item);
    });

    let removedItems = selectedCategories.filter((item) => {
      return !categories.includes(item);
    });

    if (addedItems) {
      this.addCategories(addedItems);
    }

    if (removedItems) {
      this.removeCategories(removedItems);
    }
  },

  toggleSkill(skill) {
    let list = get(this, 'projectSkillsList');
    return list.toggle(skill);
  }
});

import Controller from '@ember/controller';
import { get, getProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import recordsList from 'code-corps-ember/utils/records-list';

export default Controller.extend({
  store: service(),
  userSkillsList: service(),

  userSkills: alias('user.userSkills'),

  addCategory(category) {
    let { user, store } = getProperties(this, 'user', 'store');
    store.createRecord('user-category', { user, category }).save();
  },

  removeCategory(category) {
    let { user, userCategories }
      = getProperties(this, 'user', 'userCategories');

    let userCategory = recordsList.find(userCategories, category, user);
    userCategory.destroyRecord();
  },

  removeUserSkill(userSkill) {
    return userSkill.destroyRecord();
  },

  toggleSkill(skill) {
    let list = get(this, 'userSkillsList');
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

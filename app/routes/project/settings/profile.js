import { get, setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  async model() {
    let project = this.modelFor('project');
    let categories = await this.get('store').findAll('category');
    let projectCategories = await get(project, 'projectCategories');
    let projectSkills = await get(project, 'projectSkills');
    return { project, categories, projectCategories, projectSkills };
  },

  setupController(controller, { project, categories, projectCategories, projectSkills }) {
    setProperties(controller, { project, categories, projectCategories, projectSkills });
  }
});

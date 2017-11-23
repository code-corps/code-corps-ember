import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get, setProperties } from '@ember/object';

export default Route.extend({
  store: service(),

  model() {
    let project = this.modelFor('project');
    let categories = this.get('store').findAll('category');
    let projectCategories = get(project, 'projectCategories');
    return RSVP.hash({ project, categories, projectCategories });
  },

  setupController(controller, { project, categories, projectCategories }) {
    setProperties(controller, { project, categories, projectCategories });
  }
});

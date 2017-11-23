import { get, setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

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

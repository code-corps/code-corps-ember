import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

/**
 * `project.settings.donations.payments`
 *
 * Route used by organization owners to manage
 * stripe account information
 *
 * @module  Route
 * @extends Ember.Route
 */
export default Route.extend({
  stripe: service(),

  beforeModel() {
    return this.get('stripe').load();
  },

  model() {
    return this.modelFor('project').reload();
  },

  setupController(controller, project) {
    controller.setProperties({ project });
  }
});

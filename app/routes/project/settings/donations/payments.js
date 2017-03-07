import Ember from 'ember';

const {
  Route
} = Ember;

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
  /**
   * An Ember.Route hook
   *
   * Returns a promise, meaning hooks that follow the model hook will wait until
   * it resolves
   *
   * @return {RSVP.Promise} A promise for reloading the project route model
   */
  model() {
    return this.modelFor('project').reload();
  },

  /**
   * An Ember.Route hook
   *
   * Assingns the project property as model
   *
   * @method setupController
   * @param  {Ember.Controller} controller
   * @param  {DS.Model} project The currently loaded project
   */
  setupController(controller, project) {
    controller.setProperties({ project });
  }
});

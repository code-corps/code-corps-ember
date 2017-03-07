import Ember from 'ember';

const {
  Route
} = Ember;

/**
 * `project.settings.donations`
 *
 * Route used by organization owners to manage
 * donation goals for an organization project
 *
 * Allows creating new and editing existing donation goals,
 * as well as turning on donations for a project (work in progress)
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
   * If the project has no donation goals, initializes a new record.
   *
   * @method setupController
   * @param  {Ember.Controller} controller
   * @param  {DS.Model} project The currently loaded project
   */
  setupController(controller, project) {
    if (project.get('donationGoals.length') == 0) {
      controller.send('addDonationGoal', project);
    }

    controller.setProperties({ project });
  }
});

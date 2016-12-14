import Ember from 'ember';
import { CanMixin } from 'ember-can';

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
export default Route.extend(CanMixin, {
  /**
   * An Ember.Route hook
   *
   * Managing donation goals is for owners only, unlike managing
   * organizations generally, which is also allowed for admins.
   *
   * The hook ensures the user is able to manage organization goals.
   *
   * @method beforeModel
   */
  beforeModel() {
    if (this.cannot('manage donation goals in project')) {
      return this.transitionTo('project');
    } else {
      return this._super(...arguments);
    }
  },

  /**
   * An Ember.Route hook
   *
   * Returns a promise, meaning hooks that follow the model hook will wait until
   * it resolves
   *
   * @return {RSVP.Promise} A promise for reloading the project route model
   */
  model() {
    return this.modelFor('project');
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

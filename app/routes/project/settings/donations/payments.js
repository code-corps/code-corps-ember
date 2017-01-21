import Ember from 'ember';
import { CanMixin } from 'ember-can';

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
export default Route.extend(CanMixin, {
  /**
   * An Ember.Route hook
   *
   * Managing account information is for owners only, unlike managing
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

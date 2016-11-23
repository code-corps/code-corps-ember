import Ember from 'ember';
import { CanMixin } from 'ember-can';

const {
  get,
  Route,
  RSVP
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
   * Returns a promise hash, meaning hooks that follow the model hook will wait until
   * all promises in the hash resolve
   *
   * @return {RSVP.hash} A promise hash consisting of a project and a stripeAuth record, once resolved
   */
  model() {
    let project = this.modelFor('project');
    // need to try and fetch an existing account
    // TODO: We could consider just returning a hash of all 3 requests,
    // but this way, we don't do a Stripe.Auth request if we already performed a connect
    return get(project, 'organization.stripeConnectAccount').then((stripeConnectAccount) => {
      if (stripeConnectAccount) {
        // there is an existing account, no need to init the stripeAuth
        return RSVP.hash({ project, stripeConnectAccount });
      } else {
        // there is no existing account. need to do stripeAuth and render connect button
        let stripeAuth = get(this, 'store').queryRecord('stripe-auth', { projectId: project.id });
        return RSVP.hash({ project, stripeAuth });
      }
    });
  },

  /**
   * An Ember.Route hook
   *
   * Assingns the project and stripeAuth models as
   * controller properties.
   *
   * If the project has no donation goals, initializes a new record.
   *
   * @method setupController
   * @param  {Ember.Controller} controller
   * @param  {DS.Model} modelHash.project    The currently loaded project
   * @param  {DS.Model} modelHash.stripeAuth The stripeAuth record, for the current project
   */
  setupController(controller, { project, stripeAuth = null, stripeConnectAccount = null }) {
    if (project.get('donationGoals.length') == 0) {
      controller.send('addDonationGoal', project);
    }

    controller.setProperties({ project, stripeAuth, stripeConnectAccount });
  }
});

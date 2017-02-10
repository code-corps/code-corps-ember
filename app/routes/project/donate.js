import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const {
  get,
  inject: { service },
  Route,
  RSVP
} = Ember;

const ALREADY_A_SUBSCRIBER = "You're already supporting this project.";

export default Route.extend(AuthenticatedRouteMixin, {
  flashMessages: service(),
  userSubscriptions: service(),

  model() {
    let project = this.modelFor('project');
    return RSVP.hash({
      project,
      subscription: this.get('userSubscriptions').fetchForProject(project)
    });
  },

  afterModel({ project, subscription }) {
    if (subscription) {
      get(this, 'flashMessages').success(ALREADY_A_SUBSCRIBER);
      this.transitionTo('project', project);
    } else {
      this._super.call(...arguments);
    }
  },

  setupController(controller, models) {
    controller.setProperties(models);
  }
});

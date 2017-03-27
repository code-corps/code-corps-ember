import Ember from 'ember';

const {
  get,
  inject: { service },
  Route,
  RSVP,
  set
} = Ember;

const ALREADY_A_SUBSCRIBER = "You're already supporting this project.";

export default Route.extend({
  flashMessages: service(),
  session: service(),
  userSubscriptions: service(),

  beforeModel(transition) {
    let session = get(this, 'session');
    if (get(session, 'isAuthenticated')) {
      return this._super(...arguments);
    } else {
      set(session, 'attemptedTransition', transition);
      let queryParams = { context: 'donation' };
      return this.transitionTo('signup', { queryParams });
    }
  },

  model() {
    return this.modelFor('project').reload().then((project) => {
      let subscription = get(this, 'userSubscriptions').fetchForProject(project);
      return RSVP.hash({ project, subscription });
    });
  },

  afterModel({ project, subscription }) {
    if (subscription) {
      get(this, 'flashMessages').success(ALREADY_A_SUBSCRIBER);
      this.transitionTo('project', project);
    } else {
      this._super(...arguments);
    }
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

  renderTemplate() {
    this.render('project/checkout', { into: 'application' });
  }
});

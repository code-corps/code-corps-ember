import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { get, set } from '@ember/object';

const ALREADY_A_SUBSCRIBER = "You're already supporting this project.";

export default Route.extend({
  flashMessages: service(),
  session: service(),
  stripev3: service(),
  userSubscriptions: service(),

  beforeModel(transition) {
    let session = get(this, 'session');
    if (get(session, 'isAuthenticated')) {
      this._super(...arguments);
      return this.get('stripev3').load();
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

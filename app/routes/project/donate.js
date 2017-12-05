import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

const ALREADY_A_SUBSCRIBER = "You're already supporting this project.";

export default Route.extend({
  flashMessages: service(),
  session: service(),
  userSubscriptions: service(),

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

  setupController(controller, { project, subscription }) {
    controller.setProperties({ project, subscription });
  },

  renderTemplate() {
    this.render('project/donate', { into: 'application' });
  }
});

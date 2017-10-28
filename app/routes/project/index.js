import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  userSubscriptions: service(),

  model() {
    return this.modelFor('project').reload().then((project) => {
      let subscription = this.get('userSubscriptions').fetchForProject(project);
      return RSVP.hash({ project, subscription });
    });
  },

  setupController(controller, { project, subscription }) {
    controller.setProperties({ project, subscription });
  }
});

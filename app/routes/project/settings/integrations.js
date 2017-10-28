import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { setProperties, get } from '@ember/object';

export default Route.extend({
  currentUser: service(),

  user: alias('currentUser.user'),

  model() {
    let project = this.modelFor('project');
    let user = get(this, 'currentUser.user');

    return RSVP.hash({ project, user });
  },

  setupController(controller, { project, user }) {
    setProperties(controller, { project, user });
  }
});

import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  session: service(),

  beforeModel() {
    if (get(this, 'session.isAuthenticated')) {
      this.transitionTo('projects-list');
    }
  }
});

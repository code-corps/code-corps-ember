import Ember from 'ember';

const {
  get,
  inject: { service },
  Route
} = Ember;

export default Route.extend({
  session: service(),

  beforeModel() {
    if (get(this, 'session.isAuthenticated')) {
      this.transitionTo('projects-list');
    }
  }
});

import Ember from 'ember';

const {
  inject: { service },
  Route
} = Ember;

export default Route.extend({
  session: service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('projects-list');
    }
  }
});

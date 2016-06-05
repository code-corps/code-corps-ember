import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('projects-list');
    }
  },
});

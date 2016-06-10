import Ember from 'ember';
import ESASession from "ember-simple-auth/services/session";

export default ESASession.extend({
  store: Ember.inject.service(),

  setCurrentUser: function() {
    if (this.get('isAuthenticated')) {
      let id = this.get('session.authenticated.user_id');
      this.get('store').findRecord('user', id).then((user) => {
        this.set('currentUser', user);
      });
    }
  }.observes('isAuthenticated'),
});

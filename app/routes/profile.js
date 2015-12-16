import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    var userId = this.get('session.session.authenticated.user_id');
    return this.store.find('user', userId);
  }
});

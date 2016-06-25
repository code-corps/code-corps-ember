import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service(),

  model: function() {
    var userId = this.get('currentUser.user.id');
    return this.store.find('user', userId);
  }
});

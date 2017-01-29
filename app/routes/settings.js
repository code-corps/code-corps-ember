import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  get,
  inject: { service },
  Route
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  model() {
    let userId = get(this, 'currentUser.user.id');
    return this.store.find('user', userId);
  }
});

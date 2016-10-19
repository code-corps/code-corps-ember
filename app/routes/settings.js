import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  model() {
    let userId = this.get('currentUser.user.id');
    return this.store.find('user', userId);
  }
});

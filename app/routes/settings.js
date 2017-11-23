import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  model() {
    let userId = this.get('currentUser.user.id');
    return this.store.find('user', userId);
  },

  setupController(controller, model) {
    controller.set('user', model);
  }
});

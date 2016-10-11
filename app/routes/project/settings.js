import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, CanMixin, {
  credentials: service(),
  session: service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      let organization = this.modelFor('project.organization');
      return this.get('credentials.currentUserMembershipPromise').then((membership) => {
        if (this.cannot('manage organization', organization, { membership })) {
          return this.transitionTo('index');
        } else {
          return this._super(...arguments);
        }
      });
    } else {
      return this._super(...arguments);
    }
  }
});

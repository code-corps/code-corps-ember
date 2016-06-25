import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(AuthenticatedRouteMixin, CanMixin, {
  credentials: Ember.inject.service(),
  session: Ember.inject.service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      let organization = this.modelFor('project.organization');
      return this.get('credentials.currentUserMembershipPromise').then((membership) => {
        if (this.cannot('manage organization', organization, { membership: membership })) {
          return this.transitionTo('index');
        } else {
          return this._super(...arguments);
        }
      });
    } else {
      return this._super(...arguments);
    }
  },
});

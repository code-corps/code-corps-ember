import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(AuthenticatedRouteMixin, CanMixin, {
  credentials: Ember.inject.service(),
  session: Ember.inject.service(),

  beforeModel() {
    let organization = this.modelFor('organizations.slugged-route');
    return this.get('credentials.currentUserMembershipPromise').then((membership) => {
      if (this.cannot('manage organization', organization, { membership: membership })) {
        return this.transitionTo('index');
      } else {
        return this._super(...arguments);
      }
    });
  },
});

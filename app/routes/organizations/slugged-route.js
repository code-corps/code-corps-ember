import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  credentials: Ember.inject.service(),

  model(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    }).then((slugged_route) => {
      return slugged_route.get('organization');
    }).then((organization) => {
      return this._setOrganization(organization).then(() => organization);
    });
  },

  _setOrganization(organization) {
    if (organization) {
      return this.get('credentials').setOrganization(organization);
    } else {
      return Ember.RSVP.resolve();
    }
  }
});

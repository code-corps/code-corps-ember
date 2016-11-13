import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route,
  RSVP,
  inject: { service }
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  credentials: service(),

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
      return RSVP.resolve();
    }
  }
});

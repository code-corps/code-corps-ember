import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  get,
  inject: { service },
  Route,
  RSVP
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  credentials: service(),

  model(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    }).then((slugged_route) => {
      return get(slugged_route, 'organization');
    }).then((organization) => {
      return this._setOrganization(organization).then(() => organization);
    });
  },

  _setOrganization(organization) {
    if (organization) {
      return get(this, 'credentials').setOrganization(organization);
    } else {
      return RSVP.resolve();
    }
  }
});

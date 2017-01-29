import Ember from 'ember';

const {
  get,
  inject: { service },
  Route,
  RSVP
} = Ember;

export default Route.extend({
  credentials: service(),

  model(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    });
  },

  afterModel(sluggedRoute) {
    return get(sluggedRoute, 'organization').then((organization) => {
      if (organization) {
        return get(this, 'credentials').setOrganization(organization);
      } else {
        return RSVP.resolve();
      }
    });
  }
});

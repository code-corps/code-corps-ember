import Ember from 'ember';

const {
  Route,
  RSVP,
  inject: { service }
} = Ember;

export default Route.extend({
  credentials: service(),

  model(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    });
  },

  afterModel(sluggedRoute) {
    return sluggedRoute.get('organization').then((organization) => {
      if (organization) {
        return this.get('credentials').setOrganization(organization);
      } else {
        return RSVP.resolve();
      }
    });
  }
});

import Ember from 'ember';

export default Ember.Route.extend({
  credentials: Ember.inject.service(),

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
        return Ember.RSVP.resolve();
      }
    });
  }
});

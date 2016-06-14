import Ember from 'ember';

export default Ember.Route.extend({
  credentials: Ember.inject.service(),

  model(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    });
  },

  afterModel(sluggedRoute) {
    let type = sluggedRoute.get('ownerType');

    if (type === 'Organization') {
      sluggedRoute.get('owner').then((organization) => {
        this.get('credentials').setOrganization(organization);
        return this._super(...arguments);
      });
    }
  }
});

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  credentials: Ember.inject.service(),

  model(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    }).then((result) => {
      let organization = result.get('owner');
      return this.get('credentials').setOrganization(organization).then(() => {
        return organization;
      });
    });
  },

  afterModel(organization) {
    this.get('credentials').setOrganization(organization);
    return this._super(...arguments);
  },
});

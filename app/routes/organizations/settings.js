import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  credentials: Ember.inject.service(),

  model: function(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    }).then(function(result) {
      return result.get('owner');
    });
  },

  afterModel: function(organization) {
    this.get('credentials').setOrganization(organization);
    return this._super(...arguments);
  },
});

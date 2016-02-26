import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    }).then(function(result) {
      return result.get('owner');
    });
  }
});

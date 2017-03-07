import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    }).then((slugged_route) => {
      return slugged_route.get('organization');
    });
  }
});

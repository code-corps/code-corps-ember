import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    }).then((slugged_route) => {
      return slugged_route.get('organization');
    });
  }
});

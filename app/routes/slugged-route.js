import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    return this.store.queryRecord('slugged-route', {
      slug: params.slugged_route_slug
    });
  }
});

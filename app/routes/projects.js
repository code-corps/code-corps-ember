import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.query('project', {
      sluggedRouteSlug: params.slugged_route_slug
    });
  },

  setupController(controller, model) {
    controller.set('projects', model);
  }
});

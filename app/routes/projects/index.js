import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let { slugged_route_slug: sluggedRouteSlug } = this.paramsFor('projects');
    return this.store.query('project', { sluggedRouteSlug });
  },

  setupController(controller, model) {
    controller.set('projects', model);
  }
});

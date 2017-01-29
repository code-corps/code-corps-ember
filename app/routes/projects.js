import Ember from 'ember';

const { Route, set } = Ember;

export default Route.extend({
  model(params) {
    return this.store.query('project', {
      sluggedRouteSlug: params.slugged_route_slug
    });
  },

  setupController(controller, model) {
    set(controller, 'projects', model);
  }
});

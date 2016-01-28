import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('project', {
      sluggedRouteSlug: params.sluggedRouteSlug
    });
  },

  setupController(controller, model) {
    controller.set('projects', model);
  }
});

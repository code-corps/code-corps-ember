import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let projectParams = this.paramsFor('project');

    return this.store.queryRecord('post', {
      sluggedRouteSlug: projectParams.sluggedRouteSlug,
      projectSlug: projectParams.projectSlug,
      number: params.number
    });
  },

  setupController(controller, model) {
    controller.set('post', model);
  }
});

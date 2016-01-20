import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('project', {
      organizationSlug: params.organizationSlug
    });
  },

  setupController(controller, model) {
    controller.set('projects', model);
  }
});

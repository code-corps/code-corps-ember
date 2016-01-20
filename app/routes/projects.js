import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('project', { slug: params.organizationSlug });
  },

  setupController(controller, model) {
    controller.set('projects', model);
  }
});

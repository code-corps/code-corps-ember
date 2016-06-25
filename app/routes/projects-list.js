import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('project');
  },

  setupController(controller, model) {
    controller.set('projects', model);
  }
});

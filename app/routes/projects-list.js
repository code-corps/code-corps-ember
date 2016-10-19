import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('project');
  },

  setupController(controller, model) {
    controller.set('projects', model);
  }
});

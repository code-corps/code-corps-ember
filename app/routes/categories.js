import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('category');
  },

  setupController(controller, model) {
    controller.set('categories', model);
  }
});

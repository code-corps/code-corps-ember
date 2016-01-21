import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('post', params.post_id);
  },

  setupController(controller, model) {
    controller.set('post', model);
  }
});

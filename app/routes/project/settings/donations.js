import Ember from 'ember';

const {
  get,
  inject: { service },
  Route
} = Ember;

export default Route.extend({
  ajax: service(),

  model() {
    let project = this.modelFor('project');
    return project;
  },

  afterModel(model) {
    get(this, 'store').queryRecord('stripe-auth', {
      projectId: model.id
    }).then((result) => {
      console.log(result);
      this.controller.set('stripeAuth', result);
    });
  }
});

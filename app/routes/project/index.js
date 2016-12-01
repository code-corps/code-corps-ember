import Ember from 'ember';

const {
  inject: { service },
  Route,
  RSVP
} = Ember;

export default Route.extend({
  userSubscriptions: service(),

  model() {
    let project = this.modelFor('project');

    return RSVP.hash({
      project,
      subscription: this.get('userSubscriptions').fetchForProject(project)
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  }
});

import Ember from 'ember';

const {
  inject: { service },
  Route,
  RSVP
} = Ember;

export default Route.extend({
  userSubscriptions: service(),

  model() {
    return this.modelFor('project').reload().then((project) => {
      let subscription = this.get('userSubscriptions').fetchForProject(project);
      return RSVP.hash({ project, subscription });
    });
  },

  setupController(controller, { project, subscription }) {
    controller.setProperties({ project, subscription });
  }
});

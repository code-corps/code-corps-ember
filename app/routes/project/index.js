import Ember from 'ember';

const {
  get,
  inject: { service },
  Route,
  RSVP
} = Ember;

export default Route.extend({
  userSubscriptions: service(),

  model() {
    return this.modelFor('project').reload().then((project) => {
      let subscription = get(this, 'userSubscriptions').fetchForProject(project);
      return RSVP.hash({ project, subscription });
    });
  },

  setupController(controller, { project, subscription }) {
    controller.setProperties({ project, subscription });
  }
});

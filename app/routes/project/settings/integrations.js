import Ember from 'ember';

const {
  computed: { alias },
  get,
  inject: { service },
  Route,
  RSVP,
  setProperties
} = Ember;

export default Route.extend({
  currentUser: service(),

  user: alias('currentUser.user'),

  model() {
    let project = this.modelFor('project');
    let user = get(this, 'currentUser.user');

    return RSVP.hash({ project, user });
  },

  setupController(controller, { project, user }) {
    setProperties(controller, { project, user });
  }
});

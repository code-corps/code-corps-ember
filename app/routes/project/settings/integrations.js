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
    let organization = get(project, 'organization');
    let user = get(this, 'currentUser.user');

    return RSVP.hash({ project, organization, user });
  },

  setupController(controller, { project, organization, user }) {
    setProperties(controller, { project, organization, user });
  }
});

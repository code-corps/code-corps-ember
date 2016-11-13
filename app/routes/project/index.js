import Ember from 'ember';

const {
  inject: { service },
  Route,
  RSVP
} = Ember;

export default Route.extend({
  currentUser: service(),

  model() {
    let project = this.modelFor('project');

    return RSVP.hash({
      project,
      subscription: this._fetchCurrentUserSubscriptionFor(project)
    });
  },

  setupController(controller, models) {
    controller.setProperties(models);
  },

  _fetchCurrentUserSubscriptionFor(project) {
    let user = this.get('currentUser.user');

    if (user) {
      return user.get('subscriptions').find((subscription) => {
        subscription.belongsTo('project').id == project.get('id');
      });
    } else {
      return null;
    }
  }
});

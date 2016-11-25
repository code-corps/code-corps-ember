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
      let subscriptions = user.get('stripeConnectSubscriptions');
      let planId = project.belongsTo('stripeConnectPlan').id();
      return RSVP.hash({ subscriptions, planId }).then(({ subscriptions, planId }) => {
        let subscription = subscriptions.find((subscription) => {
          return subscription.belongsTo('stripeConnectPlan').id() === planId;
        });
        return RSVP.resolve(subscription);
      });
    } else {
      return null;
    }
  }
});

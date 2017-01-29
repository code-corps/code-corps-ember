import Ember from 'ember';

const {
  computed,
  get,
  inject: { service },
  RSVP,
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  store: service(),

  user: computed.alias('currentUser.user'),

  fetchForProject(project) {
    let user = get(this, 'user');

    if (user) {
      let subscriptions = get(user, 'stripeConnectSubscriptions');
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

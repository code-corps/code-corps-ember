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

  user: computed.alias('currentUser.user'),

  fetchForProject(project) {
    let user = get(this, 'user');

    if (user) {
      return get(user, 'stripeConnectSubscriptions').then((subscriptions) => {
        let subscription = subscriptions.find((subscription) => {
          return subscription.belongsTo('project').id() === project.id;
        });
        return RSVP.resolve(subscription);
      });
    } else {
      return null;
    }
  }
});

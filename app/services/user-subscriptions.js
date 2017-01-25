import Ember from 'ember';

const {
  computed,
  inject: { service },
  RSVP,
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  store: service(),

  user: computed.alias('currentUser.user'),

  fetchForProject(project) {
    let user = this.get('user');

    if (user) {
      return user.get('stripeConnectSubscriptions').then((subscriptions) => {
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

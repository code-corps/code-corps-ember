import { alias } from '@ember/object/computed';
import { get } from '@ember/object';
import RSVP from 'rsvp';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  currentUser: service(),

  user: alias('currentUser.user'),

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

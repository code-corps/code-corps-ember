import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
  session: service(),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      const userId = this.get('session.session.authenticated.user_id');
      if (!Ember.isEmpty(userId)) {
        return this.get('store').findRecord('user', userId).then((user) => {
          this.set('user', user);
          resolve(user);
        }, reject);
      } else {
        resolve(null);
      }
    });
  },
});

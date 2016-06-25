import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
  metrics: service(),
  session: service(),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      const userId = this.get('session.session.authenticated.user_id');
      if (!Ember.isEmpty(userId)) {
        return this.get('store').findRecord('user', userId).then((user) => {
          this.set('user', user);
          this._identifyUser(user);
          resolve(user);
        }, reject);
      } else {
        resolve(null);
      }
    });
  },

  _identifyUser(user) {
    // Segment
    Ember.get(this, 'metrics').identify({
      distinctId: user.get('id'),
      biography: user.get('biography'),
      createdAt: user.get('createdAt'),
      email: user.get('email'),
      name: user.get('name'),
      state: user.get('state'),
      username: user.get('username'),
      website: user.get('website'),
    });
  },
});

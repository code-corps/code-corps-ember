import Ember from 'ember';

const {
  get,
  inject: { service },
  isEmpty,
  RSVP,
  Service
} = Ember;

export default Service.extend({
  metrics: service(),
  session: service(),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      let userId = this.get('session.session.authenticated.user_id');
      if (!isEmpty(userId)) {
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
    get(this, 'metrics').identify({
      distinctId: user.get('id'),
      biography: user.get('biography'),
      insertedAt: user.get('insertedAt'),
      email: user.get('email'),
      name: user.get('name'),
      state: user.get('state'),
      username: user.get('username'),
      website: user.get('website')
    });
  }
});

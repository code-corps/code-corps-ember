import { get, set, setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  currentUser: service(),
  stripev3: service(),

  beforeModel(transition) {
    this._super(...arguments);
    return get(this, 'stripev3').load();
  },

  async model() {
    let userId = get(this, 'currentUser.user.id');
    let user = await this.store.find('user', userId);
    let card = get(user, 'stripePlatformCard');
    return RSVP.hash({ card, user });
  },

  setupController(controller, { card, user }) {
    setProperties(controller, { card, user });
  }
});

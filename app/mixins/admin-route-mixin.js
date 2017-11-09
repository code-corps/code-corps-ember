import Mixin from '@ember/object/mixin';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

const NOT_AN_ADMIN = "You're not authorized to view this page.";

export default Mixin.create({
  currentUser: service(),
  flashMessages: service(),
  session: service(),

  beforeModel(transition) {
    let session = get(this, 'session');
    let isAuthenticated = get(session, 'isAuthenticated');
    let isAdmin = get(this, 'currentUser.user.admin');

    if (isAuthenticated && isAdmin) {
      return this._super(...arguments);
    } else {
      set(session, 'attemptedTransition', transition);
      get(this, 'flashMessages').danger(NOT_AN_ADMIN);
      return this.transitionTo('login');
    }
  }
});

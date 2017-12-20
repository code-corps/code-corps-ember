import { get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  conversations: service(),
  currentUser: service(),
  store: service(),

  user: alias('currentUser.user'),

  async model() {
    let user = get(this, 'user');
    let store = get(this, 'store');
    // peekAll returns a live array, so it will also render any newly created
    // messages
    await store.query('conversation', { user_id: user.id });
    let conversations = store.peekAll('conversation');
    return { conversations };
  },

  renderTemplate() {
    this.render('conversations', { into: 'application' });
  },

  setupController(controller, { conversations }) {
    controller.setProperties({ conversations });
  },

  deactivate() {
    this._super(...arguments);
    get(this, 'conversations').deactivate();
    return true;
  },

  actions: {
    didTransition() {
      this._super(...arguments);
      get(this, 'conversations').activate();
      return true;
    }
  }
});

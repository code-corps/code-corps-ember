import { get, setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  currentUser: service(),

  async model() {
    let categories = this.get('store').findAll('category');
    let userId = this.get('currentUser.user.id');
    let user = await this.store.findRecord('user', userId);
    let userCategories = get(user, 'userCategories');
    return RSVP.hash({ categories, user, userCategories });
  },

  setupController(controller, { categories, user, userCategories }) {
    setProperties(controller, { categories, user, userCategories });
  }
});

import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  currentUser: service(),
  store: service(),
  userSkillsList: service(),

  model() {
    let user = get(this, 'currentUser.user');
    let popularSkills = this.store.query('skill', { limit: 20, popular: true });
    return { popularSkills, user };
  },

  setupController(controller, { popularSkills, user }) {
    controller.set('popularSkills', popularSkills);
    controller.set('user', user);
  }
});

import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  currentUser: service(),
  store: service(),
  userSkillsList: service(),

  model() {
    return get(this, 'currentUser.user');
  }
});

import Ember from 'ember';

const { get, inject: { service }, Route } = Ember;

export default Route.extend({
  currentUser: service(),
  store: service(),
  userSkillsList: service(),

  model() {
    return get(this, 'currentUser.user');
  }
});

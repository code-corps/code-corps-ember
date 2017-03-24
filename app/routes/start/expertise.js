import Ember from 'ember';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend({
  currentUser: service(),

  beforeModel() {
    this._super(...arguments);
    let user = this.get('currentUser.user');
    return user.get('user-role');
  },

  model() {
    return this.store.findAll('role');
  }
});

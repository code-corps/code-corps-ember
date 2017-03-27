import Ember from 'ember';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend({
  currentUser: service(),

  model() {
    return this.get('currentUser.user');
  }
});

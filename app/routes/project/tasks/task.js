import Ember from 'ember';

const {
  get,
  inject: { service },
  Route,
  setProperties
} = Ember;

export default Route.extend({
  currentUser: service(),
  store: service(),

  model(params) {
    let projectId = this.modelFor('project').id;
    let { number } = params;
    let store = get(this, 'store');

    return store.queryRecord('task', { projectId, number });
  },

  setupController(controller, task) {
    let store = get(this, 'store');
    let user = get(this, 'currentUser.user');
    let newComment = store.createRecord('comment', { task, user });

    return setProperties(controller, { newComment, task });
  }
});

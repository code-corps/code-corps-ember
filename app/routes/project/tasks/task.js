import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { setProperties, get } from '@ember/object';

export default Route.extend({
  currentUser: service(),
  store: service(),
  taskSkillsList: service(),

  model(params) {
    let projectId = this.modelFor('project').id;
    let { number } = params;
    let store = get(this, 'store');

    return store.queryRecord('task', { projectId, number });
  },

  afterModel(task) {
    get(this, 'taskSkillsList').setTask(task);
    return task;
  },

  setupController(controller, task) {
    let store = get(this, 'store');
    let user = get(this, 'currentUser.user');
    let newComment = store.createRecord('comment', { task, user });

    return setProperties(controller, { newComment, task });
  }
});

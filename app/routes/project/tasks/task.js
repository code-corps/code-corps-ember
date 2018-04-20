import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { setProperties, get } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  currentUser: service(),
  store: service(),
  taskSkillsList: service(),

  async model(params) {
    let store = get(this, 'store');
    let project = this.modelFor('project');
    let { number } = params;
    let projectId = project.id;
    let projectUsers = await get(project, 'projectUsers');
    let userPromises = projectUsers.mapBy('user');
    let task = store.queryRecord('task', { projectId, number });
    return RSVP.hash({ task, users: RSVP.all(userPromises) });
  },

  afterModel({ task }) {
    get(this, 'taskSkillsList').setTask(task);
    return task;
  },

  setupController(controller, { task, users }) {
    let store = get(this, 'store');
    let user = get(this, 'currentUser.user');
    let newComment = store.createRecord('comment', { task, user });

    return setProperties(controller, { newComment, task, users });
  }
});

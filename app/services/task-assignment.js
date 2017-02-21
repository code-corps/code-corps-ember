import Ember from 'ember';

const {
  get,
  inject: { service },
  Service,
  set
} = Ember;

export default Service.extend({
  store: service(),

  async assign(task, user) {
    let userTask = await get(task, 'userTask');
    return userTask ? this._update(userTask, user) : this._create(user, task);
  },

  async isAssignedTo(task, user) {
    return await get(task, 'userTask.user.id') === get(user, 'id');
  },

  async unassign(task) {
    let userTask = await get(task, 'userTask');

    if (userTask) {
      return this._destroy(userTask);
    }
  },

  _create(user, task) {
    let store = get(this, 'store');
    return store.createRecord('user-task', { user, task })
                .save();
  },

  _destroy(userTask) {
    return userTask.destroyRecord();
  },

  _update(userTask, user) {
    set(userTask, 'user', user);
    return userTask.save();
  }
});

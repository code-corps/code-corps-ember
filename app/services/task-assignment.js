import Service, { inject as service } from '@ember/service';
import { set, get } from '@ember/object';

export default Service.extend({
  store: service(),

  /**
    Assign a task to a user.

    If there's already a user task for the task passed in, it updates th
    existing record. Otherwise, it createes a new record.

    @method assign
    @param {DS.Model} task
    @param {DS.Model} user
    @return {DS.Model} userTask
  */
  async assign(task, user) {
    let userTask = await get(task, 'userTask');
    // If there's already a userTask, update, otherwise create a new one
    return userTask ? this._update(userTask, user) : this._create(user, task);
  },

  /**
    Check if a task is assigned to a user.

    @method isAssignedTo
    @param {DS.Model} task
    @param {DS.Model} user
    @return {Boolean}
  */
  async isAssignedTo(task, user) {
    return await get(task, 'userTask.user.id') === get(user, 'id');
  },

  /**
    Unassign a task.

    For the given task, unassign it from whomever it's assigned to. This simply
    destroys the userTask record for that task.

    @method assign
    @param {DS.Model} task
    @return {DS.Model} userTask
  */
  async unassign(task) {
    let userTask = await get(task, 'userTask');

    if (userTask) {
      return userTask.destroyRecord();
    }
  },

  _create(user, task) {
    let store = get(this, 'store');
    let userTask = store.createRecord('user-task', { user, task });
    return userTask.save().catch(() => {
      userTask.unloadRecord();
    });
  },

  _update(userTask, user) {
    // rollbackAttributes does not roll back relationships,
    // so we need to reset if it fails
    let oldUser = get(userTask, 'user');
    set(userTask, 'user', user);
    return userTask.save().catch(() => {
      set(userTask, 'user', oldUser);
      // so it's not dirty anymore
      userTask.rollbackAttributes();
    });
  }
});
